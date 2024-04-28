use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, command, Manager, State};
use crate::chat::{register_chat, ChatInterface, ChatMessage};

#[command]
pub fn log_application(msg: String){
    println!("[Lounge Application]: {}", msg);
}

#[command]
pub fn dev_tools(app_handle: AppHandle) {
    let window = app_handle.get_window("main").unwrap();
    window.open_devtools();
}

#[command]
pub fn open_chat(app_handle: AppHandle, register: State<'_, Arc<Mutex<HashMap<u64, ChatInterface>>>>) -> u64 {
    // TODO: use real address
    let id = register_chat(String::from("127.0.0.1:8080"), register);
    app_handle.emit_all("lounge://new-chat", id).unwrap();
    return id;
}

pub fn add_message(app_handle: Arc<AppHandle>, payload: ChatMessage) {
    app_handle.emit_all("lounge://add-message", payload).unwrap();
}
