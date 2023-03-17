// Todo : Importing Modules

const randomstring = require("randomstring");
const redis = require("redis");

// Todo: implement redis Client

const redisClient = redis.createClient({
  url: "redis://default:rohan@localhost:6379",
});

redisClient.connect();

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

// Todo: All Controller Functions

const genrateCode = (req, res) => {
  // getting email and password

  const user = req.body;
  const generatedCode = randomstring.generate(4);

  return res.status(200).json({
    username: `${user.username}`,
    generatedCode: `${generatedCode}`,
  });
};

module.exports = {
  genrateCode,
};
