use std::sync::Arc;
use axum::Router;
use axum::routing::{get, post};
use tauri::{AppHandle, command};
use tauri::async_runtime::handle;
use tokio::net::TcpListener;
use tokio::runtime;
use tokio::runtime::{Builder, Runtime};
use crate::controller::{hello_world, post_message};

#[command]
pub fn start_axum(tauri_app: AppHandle){
    println!("configuring router");

    // build our application with a single route
    let axum_app = Router::new()
        .route("/", get(hello_world))
        // .route("/message", post(post_message))
        .with_state(Arc::new(tauri_app));

    println!("starting axum");

    let runtime: Runtime = Builder::new_multi_thread()
        .worker_threads(1)
        .enable_all()
        .build()
        .unwrap();

    let handle = runtime.spawn(serve_axum(axum_app));
    // RUNTIME.block_on(handle).unwrap();
}

async fn serve_axum(axum_app: Router){
    // run our app with hyper, listening globally on port 8000
    let listener = TcpListener::bind("0.0.0.0:8000").await.unwrap();
    axum::serve(listener, axum_app).await.unwrap();
}
