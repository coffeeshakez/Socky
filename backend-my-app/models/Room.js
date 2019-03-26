function Room(roomName, roomId) {
    this.roomName = roomName;
    this.roomId = roomId;
    this.connectedClients = [];
  }
  // Sets the age
  // 
  Room.prototype.getRoomId = function() {
      return this.roomId;
  };

  Room.prototype.getRoomId = function(){
    return this.roomId;
}

Room.prototype.getRoomName = function(){
    return this.roomName;
}

Room.prototype.getConnectedClients = function(){
    return this.connectedClients;
}

Room.prototype.addClient = function(client){
    this.connectedClients.push(client);
}
  
module.exports = Room;