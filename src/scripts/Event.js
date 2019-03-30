

const CLIENT_MESSAGES = {
  connectClient: "CONNECT_CLIENT",
  connectHost: "CONNECT_HOST",
  gameEvent: "GAME_EVENT",
  gameEventToUser: "GAME_EVENT_TO_USER",
  controllerEvent: "CONTROLLER_EVENT",
}

const SERVER_MESSAGES = {
  clientConnected: "CLIENT_CONNECTED",
  hostConnected: "HOST_CONNECTED",
  clientDisconnected: "GLOBAL_EVENT_CLIENT_DISCONNECTED",
  error: "ERROR"
}



module.exports = {CLIENT_MESSAGES, SERVER_MESSAGES};