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

io.listen(server)

io.on("connection", socket => {
  // console.log("New client connected: " + socket.id);

  // console.log(io.rooms);

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
    
    let room = rooms.find( room => room.roomName === data.roomName);

    if(room){
      socket.join(data.roomName);
      let client = new Client(data.clientName, socket.id);
      room.addClient(client);
      //Send to server
      console.log("Client trying to connect to: " , room.id, "Client information: ", client);
      socket.to(room.id).emit(SERVER_MESSAGES.clientConnected, { client: client});

      //Send to connected client
      socket.emit(SERVER_MESSAGES.clientConnected, {roomName: data.roomName, roomId: room.id, clientName: data.clientName});
    }
  });

  socket.on(CLIENT_MESSAGES.controllerEvent, (data) => {
    io.to(data.roomId).emit(CLIENT_MESSAGES.controllerEvent, data);
  });

  socket.on(CLIENT_MESSAGES.gameEvent, (data) => {
    console.log("GAME EVENT is happening");
    io.to(data.roomName).emit(CLIENT_MESSAGES.gameEvent, data);
  });

  socket.on(CLIENT_MESSAGES.gameStart, (data) => {
    console.log("GAME is starting", data.selectedGame);
    io.in(data.roomName).emit(CLIENT_MESSAGES.gameEvent, data);
  });
  
  //TODO: notify server of disconnect
  socket.on("disconnect", () => {
    // let room = Object.keys(socket.rooms)[0];
    
    let room = rooms.find( (room, index) => {
      // return room.id == socket.id
    })
    
    // console.log("found room with id,", room.id , "connected to room", room.roomName);
    // io.in(room).emit(SERVER_MESSAGES.userDisconnected, socket.id)

  });
});



/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */

app.use(express.static("../build"));
app.use("/", express.static("build"));
app.use("/", express.static("build"));

server.listen(port, () => console.log(`Listening on port ${port}`));

// euris.io, lynth.io , zeew.io, zetz.io, 