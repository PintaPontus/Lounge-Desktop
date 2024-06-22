use std::sync::Arc;

use surrealdb::engine::local::Db;
use surrealdb::Surreal;
use tauri::{AppHandle, command, Manager, State};

use crate::chat::{ChatInterface, ChatMessage, fetch_chats, new_chat};

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
#[allow(dead_code)]
pub async fn open_chat(register: State<'_, Surreal<Db>>, address: String) -> Result<i64, ()> {
    let interface = ChatInterface::new(address);
    new_chat(&register, interface.clone()).await;
    Ok(interface.id)
}


#[command]
#[allow(dead_code)]
pub async fn get_chats(register: State<'_, Surreal<Db>>) -> Result<Vec<ChatInterface>, ()> {
    Ok(fetch_chats(&register).await)
}

pub fn add_message(app_handle: Arc<AppHandle>, payload: ChatMessage) {
    app_handle.emit_all("lounge://add-message", payload).unwrap();
}
