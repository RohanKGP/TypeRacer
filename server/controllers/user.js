// Todo : Importing Modules

const bcrypt = require("bcrypt");
const redis = require("redis");

// Todo : saltRounds Variable intialize for bcrypt
const saltRounds = 10;

// Todo: implement redis Client

const redisClient = redis.createClient({
  url: "redis://default:rohan@localhost:6379",
});

redisClient.connect();

redisClient.on("connect", () => {
  console.log("Connected to Redis on user page");
});

// Todo: All Controller Functions

const loginUser = (req, res) => {
  // Todo : sends user data from database to client

  // getting email and password from login button

  const user = req.body;

  redisClient.get(user.email).then((reply) => {
    if (reply === null) {
      return res.status(200).json({
        message: " User Doesn't Exist",
      });
    }
    bcrypt.compare(user.password, reply, function (err, result) {
      if (result === false) {
        return res.status(200).json({
          message: " Invalid Login Crediantials",
        });
      } else {
        return res.status(200).json({
          message: "Sucessful Login",
          success: true,
        });
      }
    });
  });
};

const addUser = (req, res) => {
  // Todo : saves user information to redis

  // Getting Email and Password from Sign Up Button

  const user = req.body;

  if (!user.email || !user.password) {
    return res.status(200).json({ message: "Invalid user data" });
  }

  redisClient.exists(user.email).then((reply) => {
    if (reply === 1) {
      return res.status(200).json({
        message: "User Exits",
      });
    } else {
      // Todo : HashWord with bcrypt
      bcrypt.hash(user.password, saltRounds).then(function (hash) {
        redisClient.set(user.email, hash);
      });

      return res.status(200).json({
        message: "Users added successfully",
        success: true,
      });
    }
  });
};

module.exports = {
  loginUser,
  addUser,
};
