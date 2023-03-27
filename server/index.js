const { startWsServer } = require("./utils/websocket");
const express = require("express");
var cors = require("cors");

const app = express();

const PORT = 3000;

const user_routes = require("./routes/user");
const invite_routes = require("./routes/invite");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hi there on MainPage");
});

// middleware or to set router

app.use("/api/user", user_routes);
app.use("/api/invite", invite_routes);

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express server listening on port ${PORT}`);
});

startWsServer(server);
