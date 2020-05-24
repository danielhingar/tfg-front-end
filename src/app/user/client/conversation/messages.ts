import { Conversation } from './conversation';

export class Message {
    id: number;
    text: string;
    createDate: string;
    answer: boolean;
    conversation: Conversation;
}
