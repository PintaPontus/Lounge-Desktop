import {Component} from '@angular/core';
import {ChatItemComponent} from "../chat-item/chat-item.component";

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
        "Chat 1",
        "Chat 2",
        "Chat 3",
        "Chat 4",
        "Chat 1",
        "Chat 2",
        "Chat 3",
        "Chat 4",
        "Chat 1",
        "Chat 2",
        "Chat 3",
        "Chat 4",
        "Chat 1",
        "Chat 2",
        "Chat 3",
        "Chat 4",
    ];

}
