import {Component} from '@angular/core';
import {ChatItemComponent} from "../chat-item/chat-item.component";
import {ChatMessage} from "../../interfaces/chat-message";
import {ChatInfo} from "../../interfaces/chat-info";

@Component({
    selector: 'chat-list',
    standalone: true,
    imports: [
        ChatItemComponent
    ],
    templateUrl: './chat-list.component.html',
    styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {
    chats = [
        {
            chatId: 0,
            name: "Chat 0",
            pictureUri: undefined,
            notify: true,
            lastMsg: { chatId: 0, content: "Ultimo 0", date: new Date() } as ChatMessage
        } as ChatInfo,
        {
            chatId: 1,
            name: "Chat 1",
            pictureUri: undefined,
            notify: false,
            lastMsg: { chatId: undefined, content: "Ultimo 1", date: new Date() } as ChatMessage
        } as ChatInfo,
        {
            chatId: 2,
            name: "Chat 2",
            pictureUri: undefined,
            notify: true,
            lastMsg: { chatId: 2, content: "Ultimo 2", date: new Date() } as ChatMessage
        } as ChatInfo,
        {
            chatId: 3,
            name: "Chat 3",
            pictureUri: undefined,
            notify: false,
            lastMsg: { chatId: undefined, content: "Ultimo 3", date: new Date() } as ChatMessage
        } as ChatInfo,
        {
            chatId: 4,
            name: "Chat 4",
            pictureUri: undefined,
            notify: false,
            lastMsg: { chatId: 4, content: "Ultimo 4", date: new Date() } as ChatMessage
        } as ChatInfo,
        {
            chatId: 5,
            name: "Chat 5",
            pictureUri: undefined,
            notify: false,
            lastMsg: { chatId: undefined, content: "Ultimo 5 veramente molto molto lungo", date: new Date() } as ChatMessage
        } as ChatInfo,
        {
            chatId: 6,
            name: "Chat 6",
            pictureUri: undefined,
            notify: false,
            lastMsg: { chatId: 6, content: "Ultimo 6", date: new Date() } as ChatMessage
        } as ChatInfo
    ];

}
