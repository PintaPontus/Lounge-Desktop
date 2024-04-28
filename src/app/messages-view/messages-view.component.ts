import {Component, Input, OnInit} from '@angular/core';
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {ChatMessage} from "../../interfaces/chat-message";
import {Observable} from "rxjs";

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
    @Input() messages!: ChatMessage[];
    @Input() bottomScroll!: Observable<boolean>;

    constructor() {
    }

    ngOnInit(): void {
        this.bottomScroll.subscribe(doScroll=>{
            console.log(`scroll: ${doScroll}`)
            if(doScroll){
                // @ts-ignore
                document.getElementById("last-msg").scrollIntoView({
                    behavior: "instant",
                    block: "start",
                    inline: "nearest"
                });
            }
        })
    }

}
