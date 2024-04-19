use std::sync::Arc;
use axum::extract::State;
use axum::Json;
use tauri::AppHandle;

use crate::tauri_layer;

pub async fn hello_world() -> String{
    String::from("Hello World")
}


pub async fn post_message(State(app_handle): State<Arc<AppHandle>>, Json(payload): Json<String>) {
    tauri_layer::add_message(app_handle, payload).await;
}

pub async fn test_message(State(app_handle): State<Arc<AppHandle>>) {
    tauri_layer::add_message(app_handle, String::from("test")).await;
}
