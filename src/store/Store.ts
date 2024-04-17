type UserId = string;

export interface Chat {
    chatId: string;
	userId: UserId;
	name: string;
	message: string;
	upvotes: UserId[];
}

export abstract class Store {
	constructor() {}

	initRoom(roomId: string) {}

	getChats(
        room: string, 
        limit: number, 
        offset: number
    ) {}

	addChat(
		userId: UserId,
		name: string,
		message: string,
		upvotes: UserId[],
		roomId: string,
		limit: number,
		offset: number
	) {}

	upvote(
        userId: UserId, 
        roomId: string, 
        chatId: string
    ) {}
}
