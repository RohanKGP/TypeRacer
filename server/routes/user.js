const express = require("express");
const router = express.Router();

const { loginUser, addUser } = require("../controllers/user");

router.route("/loginUser").post(loginUser);
router.route("/addUser").post(addUser);

module.exports = router;
