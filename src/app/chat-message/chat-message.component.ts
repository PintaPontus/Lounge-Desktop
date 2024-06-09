import {Component, Input} from '@angular/core';
import {ChatMessage} from "../../interfaces/chat-message";

@Component({
  selector: 'chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
    @Input() msg!: ChatMessage;

    constructor() { }

    formatDate(){
        return String(this.msg.date.getHours()).padStart(2, '0') + ':' +  String(this.msg.date.getMinutes()).padStart(2, '0')
    }

}
