use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};
use std::fs;
use tauri::{AppHandle, Manager};

pub struct DbState {
    pub pool: Pool<Sqlite>,
}

pub async fn init_db(app: &AppHandle) -> Result<Pool<Sqlite>, Box<dyn std::error::Error>> {
    let app_data_dir = app
        .path()
        .app_data_dir()
        .expect("failed to get app data dir");

    if !app_data_dir.exists() {
        fs::create_dir_all(&app_data_dir)?;
    }

    let db_path = app_data_dir.join("usage_tracker.db");
    let db_url = format!("sqlite://{}", db_path.to_str().unwrap());

    // Create database file if it doesn't exist
    if !db_path.exists() {
        fs::File::create(&db_path)?;
    }

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS app_usage (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            process_name TEXT NOT NULL,
            window_title TEXT,
            start_time DATETIME NOT NULL,
            end_time DATETIME,
            duration_seconds INTEGER DEFAULT 0
        );
        CREATE INDEX IF NOT EXISTS idx_start_time ON app_usage(start_time);
        ",
    )
    .execute(&pool)
    .await?;

    Ok(pool)
}

pub async fn create_usage_event(
    pool: &Pool<Sqlite>,
    process_name: &str,
    window_title: &str,
    start_time: chrono::NaiveDateTime,
) -> Result<i64, sqlx::Error> {
    let id = sqlx::query(
        "INSERT INTO app_usage (process_name, window_title, start_time, duration_seconds) VALUES (?, ?, ?, 0)",
    )
    .bind(process_name)
    .bind(window_title)
    .bind(start_time)
    .execute(pool)
    .await?
    .last_insert_rowid();

    Ok(id)
}

pub async fn update_usage_event(
    pool: &Pool<Sqlite>,
    id: i64,
    duration: i64,
    end_time: chrono::NaiveDateTime,
) -> Result<(), sqlx::Error> {
    sqlx::query("UPDATE app_usage SET duration_seconds = ?, end_time = ? WHERE id = ?")
        .bind(duration)
        .bind(end_time)
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}

pub async fn get_daily_stats(pool: &Pool<Sqlite>) -> Result<Vec<(String, i64)>, sqlx::Error> {
    // Aggregate by process_name for today
    let today = chrono::Local::now().date_naive();
    let start_of_day = today.and_hms_opt(0, 0, 0).unwrap();

    let rows = sqlx::query_as::<_, (String, i64)>(
        "SELECT process_name, SUM(duration_seconds) as total_duration 
         FROM app_usage 
         WHERE start_time >= ? 
         GROUP BY process_name 
         ORDER BY total_duration DESC",
    )
    .bind(start_of_day)
    .fetch_all(pool)
    .await?;

    Ok(rows)
}
