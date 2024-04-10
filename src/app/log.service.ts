import { Injectable } from '@angular/core';
import {invoke} from '@tauri-apps/api/tauri';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

    public log_application(msg: string) {
        invoke('log_application', {msg: String(msg)})
            .then(_ => console.log(`Application log: ${msg}`))
            .catch(e => console.error(`Unable to log: ${e}`));
    }
}
