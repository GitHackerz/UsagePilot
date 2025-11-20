use std::sync::{Arc, Mutex};
use std::time::Duration;
use tauri::{Manager, State};
use tokio::time::sleep;

mod db;
mod tracker;

struct TrackerState {
    is_running: bool,
}

fn spawn_tracker_thread(state: Arc<Mutex<TrackerState>>, db_pool: sqlx::Pool<sqlx::Sqlite>) {
    tauri::async_runtime::spawn(async move {
        let mut current_window_info: Option<tracker::WindowInfo> = None;
        let mut current_session_id: Option<i64> = None;
        let mut session_start_time = chrono::Local::now().naive_local();

        loop {
            let should_run = {
                let guard = state.lock().unwrap();
                guard.is_running
            };

            if !should_run {
                sleep(Duration::from_secs(1)).await;
                continue;
            }

            let idle_seconds = tracker::get_idle_time_seconds();
            if idle_seconds > 300 {
                // 5 mins idle
                sleep(Duration::from_secs(1)).await;
                continue;
            }

            if let Some(window) = tracker::get_active_window() {
                let now = chrono::Local::now().naive_local();

                let mut changed = false;
                if let Some(ref current) = current_window_info {
                    if current.process_name != window.process_name || current.title != window.title
                    {
                        changed = true;
                    }
                } else {
                    changed = true;
                }

                if changed {
                    // Close previous session
                    if let Some(id) = current_session_id {
                        let duration = (now - session_start_time).num_seconds();
                        let _ = db::update_usage_event(&db_pool, id, duration, now).await;
                    }

                    // Start new session
                    match db::create_usage_event(&db_pool, &window.process_name, &window.title, now)
                        .await
                    {
                        Ok(id) => {
                            current_session_id = Some(id);
                            session_start_time = now;
                            current_window_info = Some(window);
                        }
                        Err(e) => eprintln!("Failed to create usage event: {}", e),
                    }
                } else {
                    // Update current session duration every 5 seconds
                    if let Some(id) = current_session_id {
                        let duration = (now - session_start_time).num_seconds();
                        if duration % 5 == 0 {
                            let _ = db::update_usage_event(&db_pool, id, duration, now).await;
                        }
                    }
                }
            }

            sleep(Duration::from_secs(1)).await;
        }
    });
}

#[tauri::command]
async fn start_tracker(state: State<'_, Arc<Mutex<TrackerState>>>) -> Result<(), String> {
    let mut guard = state.lock().unwrap();
    guard.is_running = true;
    Ok(())
}

#[tauri::command]
async fn stop_tracker(state: State<'_, Arc<Mutex<TrackerState>>>) -> Result<(), String> {
    let mut guard = state.lock().unwrap();
    guard.is_running = false;
    Ok(())
}

#[tauri::command]
async fn get_daily_stats_command(db: State<'_, db::DbState>) -> Result<Vec<(String, i64)>, String> {
    db::get_daily_stats(&db.pool)
        .await
        .map_err(|e| e.to_string())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            Some(vec![]),
        ))
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let handle = app.handle().clone();
            let tracker_state = Arc::new(Mutex::new(TrackerState { is_running: true })); // Start running by default

            app.manage(tracker_state.clone());

            tauri::async_runtime::block_on(async move {
                let pool = db::init_db(&handle).await.expect("failed to init db");
                handle.manage(db::DbState { pool: pool.clone() });

                // Spawn tracker thread
                spawn_tracker_thread(tracker_state, pool);
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            start_tracker,
            stop_tracker,
            get_daily_stats_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
