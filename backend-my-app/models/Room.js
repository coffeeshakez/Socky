

export default class Room {

    constructor(roomName, roomId){
        this.roomName = roomName;
        this.roomId = roomId;
        this.connectedClients = [];
    }

    getRoomId(){
        return this.roomId;
    }

    getRoomName(){
        return this.roomName;
    }

    getConnectedClients(){
        return this.connectedClients;
    }
}