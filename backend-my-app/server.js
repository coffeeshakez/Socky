const express = require("express");
const http = require("http");
// const socketIO = require("socket.io");
const cors = require('cors');
const socketIO = require('socket.io')

// our localhost port
const port = process.env.PORT || 80;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);
io.origins('*:*');
io.set('origins', '*:*');

app.use(cors());

let users = {};

let rooms = {};

io.on("connection", socket => {
  console.log("New client connected: " + socket.id);

  console.log(io.rooms);

  //***************** HOST CONNECTION ****************** */ 
  socket.on("connect_host", (roomName) => {
    console.log(`room with name '${roomName}' connected`)
    socket.join(roomName);
    rooms[roomName] = socket;
    console.log(`Available rooms: ${Object.keys(rooms)}`);
    socket.emit("room_connected", roomName);
  });

  //***************** CLIENT CONNECTION ****************** */ 
  socket.on("connect_client", (data) => {
    if(Object.keys(rooms).includes(data.roomName)){
      users[data.clientName] = socket.id;
      socket.join(data.roomName);
      
      //Notify host of connection TODO: Only send to HOst connection, not all
      io.in(data.roomName).emit("broadcast_client_connected", {roomName: data.roomName, clientName: data.clientName, socketId: socket.id});

      //Notify client of connection
      socket.emit("client_connect_success", {roomName: data.roomName, clientName: data.clientName});
    }

    console.log(`client '${socket.id}' connected to room '${data.roomName}'`)
    setTimeout(() => console.log("ROOMS THE USER IS CONNECTED TO: ", socket.rooms), 1000);
  });

  socket.on("game_event", (data) => {
    io.in(data.roomName).emit("game_event", data);
  });

  socket.on("game_event_toUser", (data) => {

    io.in(data.roomName).emit("game_event", data);
  });




  socket.on("controller_event", (data) => {
    console.log("socket is connected to rooms: " + Object.keys(socket.rooms));
    let rooms = Object.keys(socket.rooms)
    Object.keys(socket.rooms).map(val => {
      console.log("connected to: ", val);
    })

    io.in(data.roomName).emit("controller_event", data);
  });
  
  socket.on("start_game", (data) => {
    console.log("START GAME in room" + data.roomName);
    io.in(data.roomName).emit("start_game", data);
  });
  
  //TODO: notify server of disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");

  });
});

/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */

app.use(express.static("../build"));
app.use("/kitchen", express.static("build"));
app.use("/updatepredicted", express.static("build"));

server.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));
