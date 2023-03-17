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

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`${PORT}, Connected`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
