const WebSocket = require("ws");
const { evRegister, evWPM } = require("../utils/constants");

var wss;
var clients = [];

function startWsServer(server) {
  wss = new WebSocket.Server({ server });
  wss.on("connection", (ws) => {
    console.log(`WebSocket client Connected -- Server`);

    ws.on("message", (message) => {
      handleWsMessage(message, ws, wss);
    });

    ws.onclose = () => {
      console.log(`Websocket Disconnected from -- Server`);
    };
  });
}

function sendEvent(userId, data) {
  if (wss === null) {
    console.log("websocket not initialised");
    return;
  }

  clients.forEach((element) => {
    if (element.id === userId) {
      element.socket.send(JSON.stringify(data));
    }
  });
}

function handleWsMessage(msg, ws, wss) {
  console.log(`Message ${msg}`);
  ev = JSON.parse(msg);
  if (ev.evType == 1) {
    clients.push({ id: ev.Data, socket: ws });
  }

  if (ev.evType == evWPM) {
    console.log(`WPMData : ${ev.Data}`);
  }
}

module.exports = {
  startWsServer,
  sendEvent,
};
