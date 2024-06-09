import {Component} from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
    selector: 'chat-menu',
    standalone: true,
    imports: [],
    templateUrl: './chat-menu.component.html',
    styleUrl: './chat-menu.component.scss'
})
export class ChatMenuComponent {

    constructor(private chatService: ChatService) {
    }

    fake() {
        this.chatService.fakeMessage({chatId: 0, content: "FAKE", date: new Date()});
    }
}
