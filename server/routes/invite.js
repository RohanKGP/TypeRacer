const express = require("express");
const router = express.Router();

const { genrateCode } = require("../controllers/invite");

router.route("/generateCode").get(genrateCode);

module.exports = router;
