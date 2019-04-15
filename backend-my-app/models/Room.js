function Room(roomName, id) {
    this.roomName = roomName;
    this.id = id;
    this.connectedClients = [];
  }
  // Sets the age
  // 
  Room.prototype.getRoomId = function() {
      return this.id;
  };
  
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