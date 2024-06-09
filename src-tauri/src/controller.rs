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
        .route("/discover", get(discover_me))
        .route("/message", post(post_message))
}

#[derive(Deserialize)]
#[allow(non_snake_case)]
pub struct MessagePayload {
    pub chatId: u64,
    pub content: String,
}

pub async fn discover_me() -> String {
    String::from("ACTIVE")
}

pub async fn post_message(State(app_handle): State<Arc<AppHandle>>, Json(payload): Json<MessagePayload>) {
    tauri_layer::add_message(
        app_handle,
        ChatMessage::new(payload)
    );
}
