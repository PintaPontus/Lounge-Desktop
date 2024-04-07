import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ChatListComponent} from "./chat-list/chat-list.component";
import {ChatMenuComponent} from "./chat-menu/chat-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatListComponent, ChatMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Lounge';
}
