import {Component, Input} from '@angular/core';
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {invoke} from "@tauri-apps/api/tauri";

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
    port: number = 0;

    open() {
        invoke<number>('new_chat')
            .then(port => this.port = port)
            .catch(e => console.error(`Unable to open: ${e}`));
    }
}
