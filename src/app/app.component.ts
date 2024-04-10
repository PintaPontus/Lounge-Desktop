import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ChatListComponent} from "./chat-list/chat-list.component";
import {ChatMenuComponent} from "./chat-menu/chat-menu.component";

import {appWindow, LogicalSize} from "@tauri-apps/api/window";
import {Event} from "@tauri-apps/api/event";
import {LogService} from "./log.service";
import {invoke} from "@tauri-apps/api/tauri";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ChatListComponent, ChatMenuComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

    private logService: LogService;

    title = 'Lounge';
    messages: string = '';

    constructor(logService: LogService) {
        this.logService = logService;
    }

    ngOnInit() {
        Promise.allSettled([
            appWindow.listen<string>("lounge://add-message", (event: Event<string>) => this.messages+=event.payload),
            invoke('start_axum')
        ]).then(r => {
            this.logService.log_application(`Startup done!`);
        });
    }

}
