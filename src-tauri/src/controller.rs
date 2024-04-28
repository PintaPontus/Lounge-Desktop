use std::sync::Arc;

use axum::{Json, Router};
use axum::extract::State;
use axum::routing::{get, post};
use serde::Deserialize;
use tauri::AppHandle;

use crate::chat::ChatMessage;
use crate::tauri_layer;

pub fn get_router() -> Router<Arc<AppHandle>> {
    Router::new()
        .route("/", get(hello_world))
        .route("/message", get(test_message))
        .route("/message", post(post_message))
}

#[derive(Deserialize)]
pub struct MessagePayload {
    pub sender: u64,
    pub msg: String,
}

pub async fn hello_world() -> String{
    String::from("Hello World")
}

pub async fn post_message(State(app_handle): State<Arc<AppHandle>>, Json(payload): Json<MessagePayload>) {
    tauri_layer::add_message(
        app_handle,
        ChatMessage::new(payload)
    );
}

pub async fn test_message(State(app_handle): State<Arc<AppHandle>>) {
    tauri_layer::add_message(
        app_handle,
        ChatMessage::new(MessagePayload {
            sender: 0,
            msg: "TEST".to_string()
        })
    );
}
