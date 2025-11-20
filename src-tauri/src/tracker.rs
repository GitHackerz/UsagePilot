use windows::Win32::System::ProcessStatus::GetModuleBaseNameW;
use windows::Win32::System::SystemInformation::GetTickCount;
use windows::Win32::System::Threading::{OpenProcess, PROCESS_QUERY_INFORMATION, PROCESS_VM_READ};
use windows::Win32::UI::Input::KeyboardAndMouse::{GetLastInputInfo, LASTINPUTINFO};
use windows::Win32::UI::WindowsAndMessaging::{
    GetForegroundWindow, GetWindowTextW, GetWindowThreadProcessId,
};

pub fn get_active_window() -> Option<super::WindowInfo> {
    unsafe {
        let hwnd = GetForegroundWindow();
        if hwnd.0 == 0 {
            return None;
        }

        let mut pid = 0;
        GetWindowThreadProcessId(hwnd, Some(&mut pid));

        let process_handle = OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, false, pid);
        if let Ok(handle) = process_handle {
            let mut process_name = [0u16; 1024];
            let len = GetModuleBaseNameW(handle, None, &mut process_name);
            let process_name = String::from_utf16_lossy(&process_name[..len as usize]);

            let mut title = [0u16; 1024];
            let len = GetWindowTextW(hwnd, &mut title);
            let title = String::from_utf16_lossy(&title[..len as usize]);

            // Close handle? Windows crate handles might implement Drop, but OpenProcess returns a HANDLE which usually needs CloseHandle.
            // The windows crate's HANDLE implements Drop if it's a specific type, but raw HANDLEs don't.
            // Actually, windows 0.52 HANDLEs are wrappers. But OpenProcess returns Result<HANDLE, Error>.
            // Let's check if we need to close it. In windows crate 0.48+, Owned handles drop automatically.
            // But OpenProcess returns a HANDLE which is Copy. We should probably use `Owned<HANDLE>` or manually close if we want to be safe,
            // but for now let's assume the windows crate wrapper handles it or we leak a handle every second (bad).
            // Wait, `windows::Win32::Foundation::HANDLE` is `Copy` and `Clone`. It does NOT close on drop.
            // We should use `CloseHandle`.
            let _ = windows::Win32::Foundation::CloseHandle(handle);

            Some(super::WindowInfo {
                process_name,
                title,
            })
        } else {
            None
        }
    }
}

pub fn get_idle_time_seconds() -> u32 {
    unsafe {
        let mut info = LASTINPUTINFO {
            cbSize: std::mem::size_of::<LASTINPUTINFO>() as u32,
            dwTime: 0,
        };
        if GetLastInputInfo(&mut info).as_bool() {
            let tick_count = GetTickCount();
            // Handle wrap around if needed, but u32 subtraction handles it naturally for small diffs
            tick_count.wrapping_sub(info.dwTime) / 1000
        } else {
            0
        }
    }
}
