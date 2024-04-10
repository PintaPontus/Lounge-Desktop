// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod controller;
mod tauri_layer;
mod listener;

use tauri_layer::log_application;
use listener::start_axum;

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            log_application,
            start_axum
        ]).run(tauri::generate_context!())
        .expect("error while building tauri application");
}
