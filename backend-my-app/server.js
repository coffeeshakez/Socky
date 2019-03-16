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

let userData = {};

let rooms = {};

io.on("connection", socket => {
  console.log("New client connected: " + socket.id);
  socket.on("connect_host", (roomName) => {
    console.log(`room with name '${roomName}' connected`)
    socket.join(roomName);
    rooms[roomName] = socket;
    console.log(`Available rooms: ${Object.keys(rooms)}`);
    socket.emit("room_connected", roomName);
  });

  socket.on("connect_client", (data) => {
    if(Object.keys(rooms).includes(data.roomName)){
      socket.join(data.roomName);
      io.in(data.roomName).emit("broadcast_client_connected", {roomName: data.roomName, clientName: data.clientName});
    }
    
    console.log(`client '${data.clientName}' connected to room '${data.roomName}'`)
  });

  socket.on("controller_event", (data) => {
    io.in(data.roomName).emit("controller_event", data);
  });
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
    delete userData[socket.id];
  });
});

/* Below mentioned steps are performed to return the Frontend build of create-react-app from build folder of backend */

app.use(express.static("../build"));
app.use("/kitchen", express.static("build"));
app.use("/updatepredicted", express.static("build"));

server.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));
