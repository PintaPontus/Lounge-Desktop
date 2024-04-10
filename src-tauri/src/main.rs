// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;
use std::thread;

use crate::controller::{hello_world, post_message, test_message};
use crate::tauri_layer::log_application;
use axum::routing::{get, post};
use axum::Router;
use tauri::App;
use tokio::net::TcpListener;
use tokio::runtime::Runtime;

mod controller;
mod tauri_layer;

#[tokio::main]
async fn main() {
    let tauri_app = tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![log_application])
        .build(tauri::generate_context!())
        .expect("error while building tauri application");

    let axum_app = Router::new()
        .route("/", get(hello_world))
        .route("/message", get(test_message))
        .route("/message", post(post_message))
        .with_state(Arc::new(tauri_app.handle()));

    // Spawn one separate threads for axum server
    let axum_handle = thread::spawn(|| {
        Runtime::new().unwrap().block_on(start_axum(axum_app));
    });
    start_tauri(tauri_app).await;

    axum_handle.join().unwrap();
}

async fn start_tauri(tauri_app: App) {
    println!("Starting Tauri");
    tauri_app.run(|_app_handle, event| match event {
        _ => {}
    });
}

async fn start_axum(axum_app: Router) {
    println!("Starting Axum");
    // run our app with hyper, listening globally on port 8000
    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, axum_app).await.unwrap();
}
