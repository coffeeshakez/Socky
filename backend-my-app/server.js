const express = require("express");
const http = require("http");
// const socketIO = require("socket.io");
const cors = require('cors');
const socketIO = require('socket.io')
const {CLIENT_MESSAGES, SERVER_MESSAGES} = require('./scripts/Event');
const Room =  require('./models/Room');
const Client = require('./models/Client');


// our localhost port
const port = process.env.PORT || 80;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);
io.origins('*:*');
io.set('origins', '*:*');

// io.configure(function () { 
//   io.set("transports", ["xhr-polling"]); 
//   io.set("polling duration", 10); 
// });

app.use(cors());

let rooms = [];


io.on("connection", socket => {
  console.log("New client connected: " + socket.id);

  console.log(io.rooms);

  /* **************** HOST CONNECTION ****************** */ 
  socket.on(CLIENT_MESSAGES.connectHost, (roomName) => {
    
    console.log(`Created room with name:  '${roomName}' connected`)
    socket.join(roomName);
    let room = new Room(roomName, socket.id)
    rooms.push(room);
    
    console.log(rooms);

    socket.emit(SERVER_MESSAGES.hostConnected, roomName);
  });

  /* **************** CLIENT CONNECTION ****************** */ 
  socket.on(CLIENT_MESSAGES.connectClient, (data) => {
    
    let room = {}
    rooms.forEach( room => {
      if(room.roomName == data.roomName){
        socket.join(data.roomName);
        let client = new Client(data.userName, socket.id);
        room.clients.push(client);
        io.in(data.roomName).emit(SERVER_MESSAGES.clientConnected, {roomName: data.roomName, clientName: data.clientName, socketId: socket.id});
        return room;
      }
    })
      
      //Notify host of connection TODO: Only send to HOst connection, not all
      
      console.log(room);
      //Notify client of connection
      socket.emit(SERVER_MESSAGES.clientConnected, {roomName: data.roomName, clientName: data.clientName});
    

    
    setTimeout(() => console.log("ROOMS THE USER IS CONNECTED TO: ", socket.rooms), 1000);
  });

  socket.on(CLIENT_MESSAGES.gameEvent, (data) => {
    io.in(data.roomName).emit(CLIENT_MESSAGES.gameEvent, data);
  });

  socket.on("game_event_toUser", (data) => {
    io.in(data.roomName).emit("game_event", data);
  });

  socket.on(CLIENT_MESSAGES.controllerEvent, (data) => {
    console.log("socket is connected to rooms: " + Object.keys(socket.rooms));
    let rooms = Object.keys(socket.rooms)
    Object.keys(socket.rooms).map(val => {
      console.log("connected to: ", val);
    })

    io.in(data.roomName).emit(CLIENT_MESSAGES.controllerEvent, data);
  });
  
  
  //TODO: notify server of disconnect
  socket.on("disconnect", () => {
    let room = Object.keys(socket.rooms)[0];
    io.in(room).emit(SERVER_MESSAGES.userDisconnected, socket.id)
  });
});






/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */

app.use(express.static("../build"));
app.use("/", express.static("build"));
app.use("/", express.static("build"));

server.listen(port, () => console.log(`Listening on port ${port}`));

// euris.io, lynth.io , zeew.io, zetz.io, 