use std::collections::HashMap;
use std::sync::{Arc, Mutex};

use axum::extract::{Path, State};
use chrono::{DateTime, Utc};
use rand::{RngCore, thread_rng};
use serde::ser::SerializeStruct;
use serde::Serializer;
use tauri::{AppHandle, Manager};
use crate::controller::MessagePayload;

pub struct ChatInterface {
    pub id: u64,
    pub address: String
}

#[derive(Clone)]
pub struct ChatMessage {
    pub chat_id: u64,
    pub content: String,
    pub date: DateTime<Utc>
}

impl ChatInterface{
    pub fn new(address: String) -> Self {
        let mut rng = thread_rng();
        Self{
            id: rng.next_u64(),
            address
        }
    }
}

impl ChatMessage{
    pub fn new(message: MessagePayload) -> Self {
        Self{
            chat_id: message.chatId,
            content: message.content,
            date: Utc::now()
        }
    }
}

impl serde::ser::Serialize for ChatMessage {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> where S: Serializer {
        let mut state = serializer.serialize_struct("ChatMessage", 3)?;
        state.serialize_field("chatId", &self.chat_id)?;
        state.serialize_field("content", &self.content)?;
        state.serialize_field("date", &self.date)?;
        state.end()
    }
}

pub fn register_chat(address: String, register: tauri::State<Arc<Mutex<HashMap<u64, ChatInterface>>>>) -> u64 {
    let interface = ChatInterface::new(address);
    let id = interface.id;
    println!("REGISTERED CHAT {id}");
    register.lock().unwrap().insert(id, interface);
    return id;
}

// TODO: communicate with the other client
#[allow(dead_code)]
pub fn close_chat(State(app_handle): State<Arc<AppHandle>>, Path(chat_id): Path<u64>) {
    match app_handle.try_state::<Arc<Mutex<HashMap<u64, ChatInterface>>>>() {
        Some(register) => {
            let chat = register.lock().unwrap().remove(&chat_id).unwrap();
            println!("CHAT CLOSED {}", chat.id);
        },
        None => {}
    }
}
