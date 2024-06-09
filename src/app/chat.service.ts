import {Injectable} from '@angular/core';
import {LogService} from "./log.service";
import {appWindow} from "@tauri-apps/api/window";
import {ChatMessage} from "../interfaces/chat-message";
import {Event} from "@tauri-apps/api/event";
import {Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    private chats:Map<number, Subject<ChatMessage>> = new Map();

    constructor(private logService: LogService) {
        appWindow.listen<ChatMessage>("lounge://add-message", (event: Event<ChatMessage>) => {
            // this.logService.log_application(`NEW MESSAGE: ${JSON.stringify(event.payload)}`);
            event.payload.date = new Date(event.payload.date);
            this.addMessage(event.payload.chatId!, event.payload);
        }).then(_ => {});
    }

    public dev_tools() {
        this.logService.dev_tools();
    }

    private addMessage(chatId: number, message: ChatMessage){
        if (!this.chats.has(chatId)){
            this.chats.set(chatId, new Subject());
        }
        this.chats.get(chatId)?.next(message);
    }

    public listenChat(chatId: number){
        if (!this.chats.has(chatId)){
            this.chats.set(chatId, new Subject());
        }
        return this.chats.get(chatId)?.asObservable();
    }

    public fakeMessage(message: ChatMessage){
        this.chats.get(message.chatId!)?.next(message);
    }

    async sendMessage(chatId: number, content: string) {
    //     TODO: implement
        this.addMessage(chatId, {content: content, date: new Date()} as ChatMessage)
    }
}
