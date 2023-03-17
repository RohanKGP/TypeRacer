const express = require("express");
const router = express.Router();

const { genrateCode } = require("../controllers/invite");

router.route("/generateCode").post(genrateCode);

module.exports = router;
