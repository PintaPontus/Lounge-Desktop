use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::thread;
use std::thread::JoinHandle;

use axum::{Json, Router};
use axum::extract::{Path, State};
use axum::routing::{get, post};
use rand::{RngCore, thread_rng};
use tauri::{AppHandle, Manager};
use tokio::net::TcpListener;
use tokio::runtime::Runtime;

use crate::tauri_layer;

pub struct ChatInterface {
    pub id: u64,
    pub port: u16,
    thread_handle: Option<JoinHandle<()>>
}

impl ChatInterface{
    pub fn new() -> Self {
        let mut rng = thread_rng();
        Self{
            id: rng.next_u64(),
            port: 0,
            thread_handle: None,
        }
    }

    pub async fn serve(&mut self, app_handle: AppHandle) {
        if self.thread_handle.is_none() {
            let router = Router::new()
                .route("/message", post(receive_message))
                .route("/close/:chat_id", get(close_chat))
                .with_state(Arc::new(app_handle));

            let listener = TcpListener::bind("0.0.0.0:0").await.unwrap();

            self.port = listener.local_addr().unwrap().port();

            self.thread_handle = Some(thread::spawn(move || {
                Runtime::new().unwrap().block_on(async {
                    axum::serve(listener, router).await.unwrap()
                });
            }));
        }
    }

    pub fn stop(self){
        if self.thread_handle.is_some() {
            self.thread_handle.unwrap().join().unwrap();
        }
    }
}

pub async fn register_chat<'a>(app_handle: AppHandle, register: tauri::State<'a, Arc<Mutex<HashMap<u64, ChatInterface>>>>) -> u16 {
    let mut interface = ChatInterface::new();
    interface.serve(app_handle).await;
    let id = interface.id;
    let port = interface.port;
    println!("REGISTERED CHAT {id}");
    register.lock().unwrap().insert(id, interface);
    return port;
}

async fn receive_message(State(app_handle): State<Arc<AppHandle>>, Json(payload): Json<String>) {
    tauri_layer::add_message(app_handle, payload).await;
}

async fn close_chat(State(app_handle): State<Arc<AppHandle>>, Path(chat_id): Path<u64>) {
    match app_handle.try_state::<Arc<Mutex<HashMap<u64, ChatInterface>>>>() {
        Some(register) => {
            let chat = register.lock().unwrap().remove(&chat_id).unwrap();
            println!("STOPPING CHAT {chat_id}");
            chat.stop();
            println!("CHAT CLOSED {chat_id}");
        },
        None => {
        }
    }
}
