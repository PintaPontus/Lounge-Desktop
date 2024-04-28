import {Component, NgZone, OnInit, signal, WritableSignal} from '@angular/core';
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {ChatMessage} from "../../interfaces/chat-message";
import {ChatPromptComponent} from "../chat-prompt/chat-prompt.component";
import {NgClass} from "@angular/common";
import {appWindow} from "@tauri-apps/api/window";
import {LogService} from "../log.service";
import {MessagesViewComponent} from "../messages-view/messages-view.component";
import {Subject} from "rxjs";
import {Event} from "@tauri-apps/api/event"

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
export class ChatViewComponent implements OnInit {
    readonly messages: WritableSignal<ChatMessage[]> = signal([
        { sender: 0, content: "TEST", date: new Date() } as ChatMessage,
        { sender: undefined, content: "TEST", date: new Date() } as ChatMessage,
        { sender: undefined, content: "TEST", date: new Date() } as ChatMessage,
        { sender: 0, content: "TEST", date: new Date() } as ChatMessage,
        { sender: 0, content: "TEST", date: new Date() } as ChatMessage,
        { sender: undefined, content: "TEST", date: new Date() } as ChatMessage,
        { sender: 0, content: "TEST", date: new Date() } as ChatMessage,
        { sender: 0, content: "TEST", date: new Date() } as ChatMessage,
    ]);
    readonly bottomScroll: Subject<boolean> = new Subject();
    readonly isBottom: WritableSignal<boolean> = signal(false);

    constructor(private logService: LogService, private ngZone: NgZone) {
    }

    ngOnInit() {
        Promise.allSettled([
            appWindow.listen<ChatMessage>("lounge://add-message", (event: Event<ChatMessage>) => {
                this.ngZone.run(()=> {
                    event.payload.date = new Date(event.payload.date)
                    this.messages.update(value => {value.push(event.payload); return value})
                });
                this.bottom();
                this.logService.log_application(`[${JSON.stringify(event.payload)}] ${typeof event.payload.date}`);
            })
        ]).then(_ => {
            this.logService.log_application(`Init Chat Done`);
        });
        this.bottom();
        this.bottomScroll.subscribe(anchor => {
            this.isBottom.set(anchor);
        })
    }

    bottom(){
        this.bottomScroll.next(true);
    }

    onScroll() {
        this.bottomScroll.next(false);
    }
}
