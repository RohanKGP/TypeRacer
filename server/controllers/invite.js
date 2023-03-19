// Todo : Importing Modules
const { sendEvent } = require("../utils/websocket");
const randomstring = require("randomstring");
const redis = require("redis");
const { peerConnected } = require("../utils/constants");

// Todo: implement redis Client

const redisClient = redis.createClient({
  url: "redis://default:rohan@localhost:6379",
});

redisClient.connect();

redisClient.on("connect", () => {
  console.log("Connected to Redis on invite page");
});

// Todo: All Controller Functions

const genrateCode = (req, res) => {
  // getting email and password

  const user = req.body;
  const generatedCode = randomstring.generate(4);

  redisClient.set(generatedCode, user.username);

  return res.status(200).json({
    username: `${user.username}`,
    generatedCode: `${generatedCode}`,
  });
};

const checkCode = (req, res) => {
  // Checking code in redis

  const user = req.body;
  redisClient.get(user.enteredCode).then((reply) => {
    if (reply === null) {
      return res.status(200).json({
        message: "Invalid Code",
        success: false,
      });
    } else {
      console.log(`EMail : ${user.username}`);
      // handle successful token
      // sending B data about A
      sendEvent(user.username, {
        evType: `${peerConnected}`,
        data: `${reply}`,
      });

      // Send A data about B
      sendEvent(reply, {
        evType: `${peerConnected}`,
        data: user.username,
      });

      return res.status(200).json({
        success: true,
      });
    }
  });
};

module.exports = {
  genrateCode,
  checkCode,
};
