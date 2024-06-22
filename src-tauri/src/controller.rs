use std::net::SocketAddr;
use std::sync::Arc;

use axum::{Json, Router};
use axum::extract::{ConnectInfo, State};
use axum::routing::{get, post};
use serde::Deserialize;
use surrealdb::engine::local::Db;
use surrealdb::Surreal;
use tauri::{AppHandle, Manager};

pub fn get_router() -> Router<Arc<AppHandle>> {
    Router::new()
        .route("/discover", get(discover_me))
        .route("/message", post(receive_message))
}

#[derive(Deserialize)]
#[allow(non_snake_case)]
pub struct MessagePayload {
    pub chatId: i64,
    pub content: String,
}

pub async fn discover_me() -> String {
    String::from("ACTIVE")
}

pub async fn receive_message(State(app_handle): State<Arc<AppHandle>>, ConnectInfo(addr): ConnectInfo<SocketAddr>, Json(payload): Json<MessagePayload>) {
    let full_address = format!("{}:{}", addr.ip(), addr.port());
    println!("MESSAGE FROM: {}", full_address);
    match app_handle.try_state::<Surreal<Db>>() {
        Some(register) => {
            // let chat = match register.lock().unwrap().get(&full_address) {
            //     Some(c) => { c.clone() }
            //     None => {
            //         let interface = ChatInterface::new(full_address);
            //         register.lock().unwrap().insert(full_address.clone(), interface.clone());
            //         interface
            //     }
            // };
            // println!("MESSAGE FROM {}", chat.id);
            // payload.chatId = chat.id;
            // tauri_layer::add_message(
            //     app_handle,
            //     ChatMessage::new(payload)
            // );
            todo!();
        },
        None => {}
    }
}
