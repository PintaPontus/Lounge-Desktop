import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgZone} from '@angular/core';
import {ChatListComponent} from "./chat-list/chat-list.component";
import {ChatMenuComponent} from "./chat-menu/chat-menu.component";

import {appWindow} from "@tauri-apps/api/window";
import {Event} from "@tauri-apps/api/event";
import {LogService} from "./log.service";
import {ChatViewComponent} from "./chat-view/chat-view.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ChatListComponent, ChatMenuComponent, ChatViewComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    title = 'Lounge';
    readonly messages: WritableSignal<string[]> = signal([
        "TEXT",
        "TEXT",
        "TEXT",
    ]);

    constructor(private logService: LogService, private ngZone: NgZone) {
    }

    ngOnInit() {
        Promise.allSettled([
            appWindow.listen<string>("lounge://add-message", (event: Event<string>) => {
                this.ngZone.run(()=>this.messages.update(value => {value.push(event.payload); return value}));
                this.logService.log_application(`Added message: ${this.messages()}`);
            })
        ]).then(r => {
            this.logService.log_application(`Init Window Done: ${JSON.stringify(r)}`);
        });
        this.logService.log_application(`Window Render Done`);
    }

}
