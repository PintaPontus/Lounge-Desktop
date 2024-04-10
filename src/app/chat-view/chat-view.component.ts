import {Component, Input} from '@angular/core';
import {ChatMessageComponent} from "../chat-message/chat-message.component";

@Component({
  selector: 'chat-view',
  standalone: true,
    imports: [
        ChatMessageComponent
    ],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss'
})
export class ChatViewComponent {
    @Input() messages!: string[];
}
