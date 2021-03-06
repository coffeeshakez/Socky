

const CLIENT_MESSAGES = {
    connectClient: "CONNECT_CLIENT",
    connectHost: "CONNECT_HOST",
    gameEvent: "GAME_EVENT",
    gameEventToUser: "GAME_EVENT_TO_USER",
    controllerEvent: "CONTROLLER_EVENT",
    gameStart: "GAME_START"
  }

  const SERVER_MESSAGES = {
    clientConnected: "CLIENT_CONNECTED",
    hostConnected: "HOST_CONNECTED",
    clientDisconnected: "GLOBAL_EVENT_CLIENT_DISCONNECTED",
  }

  module.exports = {CLIENT_MESSAGES, SERVER_MESSAGES};