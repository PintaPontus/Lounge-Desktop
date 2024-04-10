import {Component, Input} from '@angular/core';

@Component({
  selector: 'chat-message',
  standalone: true,
  imports: [],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss'
})
export class ChatMessageComponent {
    @Input() text!: string;
    date: Date = new Date();
    protected readonly String = String;
}
