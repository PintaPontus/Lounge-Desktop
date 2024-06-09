import {Component, Input} from '@angular/core';
import {NgClass, NgOptimizedImage} from "@angular/common";
import {ChatInfo} from "../../interfaces/chat-info";

@Component({
    selector: 'chat-item',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgClass
    ],
    templateUrl: './chat-item.component.html',
    styleUrl: './chat-item.component.scss'
})
export class ChatItemComponent {
    @Input() chat!: ChatInfo;

}
