use std::sync::Arc;
use axum::extract::State;
use axum::Json;
use tauri::AppHandle;

use crate::tauri_layer;

pub async fn hello_world() -> String{
    String::from("Hello World")
}

#[allow(dead_code)]
pub async fn post_message(Json(payload): Json<String>, State(app_handle): State<Arc<AppHandle>>) {
    tauri_layer::add_message(payload, app_handle).await;
}
