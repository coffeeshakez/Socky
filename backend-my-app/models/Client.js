
function Client(name, socketId, room) {
    this.room = room;
    this.socketId = socketId;
    this.name = name;
  }
  
  Client.prototype.getName = function() {
      return this.name;
  };

  Client.prototype.getSocketId = function(){
    return this.socketId;
}

Client.prototype.getRoom = function(){
    return this.room;
}
  
module.exports = Client;



