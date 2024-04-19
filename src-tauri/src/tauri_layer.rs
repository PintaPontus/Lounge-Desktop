use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, command, Manager, State};
use crate::chat::{register_chat, ChatInterface};

#[command]
pub fn log_application(msg: String){
    println!("[Lounge Application]: {}", msg);
}

#[command]
pub fn dev_tools(app_handle: AppHandle) -> bool{
    let window = app_handle.get_window("main").unwrap();
    let opened = window.is_devtools_open();
    if opened {
        println!("Closing dev tools");
        window.close_devtools();
    } else {
        println!("Opening dev tools");
        window.open_devtools();
    }
    return !opened;
}

#[command]
pub async fn new_chat(app_handle: AppHandle, register: State<'_, Arc<Mutex<HashMap<u64, ChatInterface>>>>) -> Result<u16, ()> {
    Ok(register_chat(app_handle, register).await)
}

pub async fn add_message(app_handle: Arc<AppHandle>, payload: String) {
    app_handle.emit_all("lounge://add-message", payload).unwrap();
}
