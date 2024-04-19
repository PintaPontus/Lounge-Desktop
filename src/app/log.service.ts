import {Injectable} from '@angular/core';
import {invoke} from '@tauri-apps/api/tauri';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    constructor() {
    }

    public log_application(msg: any) {
        invoke('log_application', {msg: String(msg)})
            .then(_ => console.log(`WebApp log: ${msg}`))
            .catch(e => console.error(`Unable to log: ${e}`));
    }

    public dev_tools() {
        invoke<boolean>('dev_tools')
            .then(opened => console.log(`WebApp log: dev_tools new ${opened ? 'opened' : 'closed'}`))
            .catch(e => console.error(`Unable to toggle dev_tools: ${e}`));
    }
}
