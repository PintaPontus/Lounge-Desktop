import {Component, ElementRef, Input, NgZone, OnInit, signal, WritableSignal} from '@angular/core';
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {ChatMessage} from "../../interfaces/chat-message";
import {LogService} from "../log.service";
import {ChatService} from "../chat.service";

@Component({
  selector: 'messages-view',
  standalone: true,
    imports: [
        ChatMessageComponent
    ],
  templateUrl: './messages-view.component.html',
  styleUrl: './messages-view.component.scss'
})
export class MessagesViewComponent implements OnInit {
    @Input() chatId!: number;
    readonly messages: WritableSignal<ChatMessage[]> = signal([]);

    constructor(private ngZone: NgZone, private logService: LogService, private chatService: ChatService, private elRef: ElementRef) {
    }

    ngOnInit() {
        // TODO: remove later
        this.messages.set([
            { chatId: this.chatId, content: "TEST", date: new Date() } as ChatMessage,
            { chatId: undefined, content: "TEST", date: new Date() } as ChatMessage,
            { chatId: undefined, content: "TEST", date: new Date() } as ChatMessage,
            { chatId: this.chatId, content: "TEST", date: new Date() } as ChatMessage,
            { chatId: this.chatId, content: "TEST", date: new Date() } as ChatMessage,
            { chatId: undefined, content: "TEST", date: new Date() } as ChatMessage,
            { chatId: this.chatId, content: "TEST", date: new Date() } as ChatMessage,
            { chatId: this.chatId, content: "TEST", date: new Date() } as ChatMessage,
        ]);
        this.chatService.listenChat(this.chatId)?.subscribe(newMessage => {
            this.addMessage(newMessage);
        });
    }

    addMessage(message: ChatMessage){
        this.ngZone.run(()=>{
            this.messages.update(value => {value.push(message); return value});
            setTimeout(()=>{
                let el = this.elRef.nativeElement;
                el.scroll({
                    top: el.scrollHeight,
                    behavior: "smooth",
                });
            }, 50);
        });
    }

    // goBottom(){
    //     let element = document.getElementById("last");
    //     // this.logService.log_application(`scroll ${element? 'done': 'entered'}`);
    //     if(element){
    //         // @ts-ignore
    //         // element.scrollIntoView(true);
    //
    //         // @ts-ignore
    //         element.scrollIntoView({
    //             behavior: "instant",
    //             block: "end",
    //             inline: "start"
    //         });
    //     }
    // }



}
