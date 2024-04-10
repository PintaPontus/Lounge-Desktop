use std::sync::Arc;
use tauri::{AppHandle, command, Manager};

#[command]
pub fn log_application(msg: String){
    println!("[Lounge Application]: {}", msg);
}

pub async fn add_message(payload: String, app_handle: Arc<AppHandle>) {
    app_handle.emit_all("lounge://add-message", payload).unwrap();
}
