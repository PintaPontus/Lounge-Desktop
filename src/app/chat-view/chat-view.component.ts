import {Component, Input} from '@angular/core';
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {ChatPromptComponent} from "../chat-prompt/chat-prompt.component";
import {NgClass} from "@angular/common";
import {MessagesViewComponent} from "../messages-view/messages-view.component";

@Component({
  selector: 'chat-view',
  standalone: true,
    imports: [
        ChatMessageComponent,
        ChatPromptComponent,
        NgClass,
        MessagesViewComponent
    ],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss'
})
export class ChatViewComponent {
    @Input()
    chatId!: number;

    constructor() {
    }

}
