// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::{env, thread};

use axum::Router;
use tauri::App;
use tokio::net::TcpListener;
use tokio::runtime::Runtime;

use crate::chat::ChatInterface;
use crate::controller::get_router;
use crate::tauri_layer::{dev_tools, log_application, open_chat};

mod controller;
mod tauri_layer;
mod chat;

#[tokio::main]
async fn main() {
    let tauri_app = tauri::Builder::default()
        .manage(Arc::new(Mutex::new(HashMap::<u64, ChatInterface>::new())))
        .invoke_handler(tauri::generate_handler![
            log_application,
            dev_tools,
            open_chat
        ])
        .build(tauri::generate_context!())
        .expect("Error while building Tauri Application");

    let axum_app = get_router()
        .with_state(Arc::new(tauri_app.handle()));

    // Spawn one separate threads for axum server
    let axum_handle = thread::spawn(|| {
        Runtime::new().unwrap().block_on(start_axum(axum_app));
    });

    start_tauri(tauri_app).await;

    axum_handle.join().unwrap();
}

async fn start_tauri(tauri_app: App) {
    // println!("Starting Tauri side");
    tauri_app.run(|_app_handle, event| match event {
        _ => {}
    });
}

async fn start_axum(axum_app: Router) {
    // println!("Starting Axum side");
    let port = env::var("LISTENING_PORT").unwrap_or(String::from("8000"));
    let listener = TcpListener::bind(format!("0.0.0.0:{}", port)).await.unwrap();
    axum::serve(listener, axum_app).await.unwrap();
}
