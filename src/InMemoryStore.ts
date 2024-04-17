import { Store, Chat } from "./store/Store";

type UserId = string;
let globalChatId = 0;

export interface Room {
    roomId: string;
    chats: Chat[];
}

export class InMemoryStore implements Store {
    private store: Map<string, Room>

	constructor() {
        this.store = new Map();
    }

	initRoom(roomId:string) {
        this.store.set(roomId, {roomId, chats: []});
    }

	getChats(
        roomId: string, 
        limit: number, 
        offset: number
    ) {
        const room = this.store.get(roomId);
        if (!room) {
            return [];
        }
        return room.chats.slice(offset, offset + limit);
    }

	addChat(
        userId:UserId, 
        name:string, 
        message:string, 
        upvotes:UserId[], 
        roomId: string, 
        limit: number, 
        offset: number
    ) {
        const room = this.store.get(roomId);
        if (!room) {
            return;
        }
        room.chats.push({
            chatId: (globalChatId++).toString(),
            userId,
            name,
            message,
            upvotes,
        })
    }

	upvote(
        userId: UserId,
        roomId: string, 
        chatId: string
    ) {
        const room = this.store.get(roomId);
        if (!room) {
            return;
        }
        const chat = room.chats.find(chat => chat.chatId === chatId);
        if (!chat) {
            return;
        }
        chat.upvotes.push(userId);
    }
}
