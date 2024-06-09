import {Component, Input} from '@angular/core';
import {ChatService} from "../chat.service";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {LogService} from "../log.service";

@Component({
  selector: 'chat-prompt',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './chat-prompt.component.html',
  styleUrl: './chat-prompt.component.scss'
})
export class ChatPromptComponent {
    @Input() chatId!: number;
    messageContent = new FormControl('');

    constructor(private chatService: ChatService, private logService: LogService) {
    }

    dev_tools() {
        this.chatService.dev_tools()
    }

    onSubmit() {
        let content = this.messageContent.getRawValue();
        if(content){
            this.messageContent.setValue('');
            this.logService.log_application(`Sending to ${this.chatId}: ${content}`);
            this.chatService.sendMessage(this.chatId, content)
                .then(_ => {
                    // TODO: implement send confirm
                    // newMessage.sent = true;
                });
        }
    }
}
