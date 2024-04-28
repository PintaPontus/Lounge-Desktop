import { Component } from '@angular/core';
import {ChatService} from "../chat.service";

@Component({
  selector: 'chat-prompt',
  standalone: true,
  imports: [],
  templateUrl: './chat-prompt.component.html',
  styleUrl: './chat-prompt.component.scss'
})
export class ChatPromptComponent {

    constructor(private chatService: ChatService) {
    }

    dev_tools() {
        this.chatService.dev_tools()
    }

}
