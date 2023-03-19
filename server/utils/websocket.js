const WebSocket = require("ws");
const { evRegister, evWPM } = require("../utils/constants");

var wss;
var clients = [];

function startWsServer(server) {
  wss = new WebSocket.Server({ server });
  wss.on("connection", (ws) => {
    console.log(`WebSocket client Connected -- Server`);

    ws.on("message", (message) => {
      handleWsMessage(message, ws);
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

function handleWsMessage(msg, ws) {
  ev = JSON.parse(msg);
  if (parseInt(ev.evType) === 1) {
    clients.push({ id: ev.data, socket: ws });
  }

  if (parseInt(ev.evType) === evWPM) {
    console.log(`Ev : ${JSON.stringify(ev)}`);
    sendEvent(ev.peer, { evType: evWPM, data: ev.data });
  }
}

module.exports = {
  startWsServer,
  sendEvent,
};
