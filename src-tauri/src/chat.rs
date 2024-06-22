use chrono::{DateTime, Utc};
use rand::{RngCore, thread_rng};
use serde::{Deserialize, Serialize, Serializer};
use serde::ser::SerializeStruct;
use surrealdb::engine::local::Db;
use surrealdb::sql::Thing;
use surrealdb::Surreal;

use crate::controller::MessagePayload;

#[derive(Debug, Deserialize)]
pub(crate) struct Record {
    #[allow(dead_code)]
    id: Thing,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ChatInterface {
    pub id: i64,
    pub address: String
}

#[derive(Clone)]
pub struct ChatMessage {
    pub chat_id: i64,
    pub content: String,
    pub date: DateTime<Utc>
}

impl ChatInterface{
    pub fn new(address: String) -> Self {
        let mut rng = thread_rng();
        Self{
            id: rng.next_u64() as i64,
            address
        }
    }
}

impl ChatMessage{
    pub fn new(message: MessagePayload) -> Self {
        Self{
            chat_id: message.chatId,
            content: message.content,
            date: Utc::now()
        }
    }
}

impl serde::ser::Serialize for ChatMessage {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error> where S: Serializer {
        let mut state = serializer.serialize_struct("ChatMessage", 3)?;
        state.serialize_field("chatId", &self.chat_id)?;
        state.serialize_field("content", &self.content)?;
        state.serialize_field("date", &self.date)?;
        state.end()
    }
}

#[allow(dead_code)]
pub async fn new_chat(db: &Surreal<Db>, chat_interface: ChatInterface) {
    let created: Vec<Record> = db
        .create("chat")
        .content(chat_interface)
        .await
        .unwrap();
    dbg!(created);
}

#[allow(dead_code)]
pub async fn fetch_chats(db: &Surreal<Db>) -> Vec<ChatInterface> {
    let chats: Vec<ChatInterface> = db
        .select("chat")
        .await
        .unwrap();
    dbg!(&chats);
    chats
}

// TODO: communicate with the other client
#[allow(dead_code)]
pub async fn close_chat(db: Surreal<Db>, id: i64) {
    let deleted: Option<Record> = db
        .delete(("chat", id))
        .await
        .unwrap();
    dbg!(deleted);
}
