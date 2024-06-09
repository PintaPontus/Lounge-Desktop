import {ChatMessage} from "./chat-message";

export interface ChatInfo {
    chatId: number,
    name: string,
    pictureUri: string | undefined,
    notify: boolean,
    lastMsg: ChatMessage
}
