import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'chat-item',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    templateUrl: './chat-item.component.html',
    styleUrl: './chat-item.component.scss'
})
export class ChatItemComponent {
    @Input() chat!: string;

}
