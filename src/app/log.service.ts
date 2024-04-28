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
            .then(_ => console.log(`WebApp log: dev_tools now opened`))
            .catch(e => console.error(`Unable to use dev_tools: ${e}`));
    }
}
