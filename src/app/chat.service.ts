import {Injectable} from '@angular/core';
import {LogService} from "./log.service";

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private logService: LogService) {
    }

    public dev_tools() {
        this.logService.dev_tools()
    }

}
