import { socket } from '../global/header';

export default class User{

    constructor(userName, socketId, roomName){
        this.userName = userName;
        this.socketId = socketId;
        this.roomName = roomName;
    }

    getUserName(){
        return this.userName;
    }

    getSocketId(){
        return this.socketId;
    }

    sendEvent(eventType, data){
        socket.emit("game_event", {
            event: eventType,
            clientName: this.userName,
            socketId: this.socketId,
            data: data
        });
    }
}