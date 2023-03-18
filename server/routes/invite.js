const express = require("express");
const router = express.Router();

const { genrateCode } = require("../controllers/invite");
const { checkCode } = require("../controllers/invite");

router.route("/generateCode").post(genrateCode);
router.route("/checkCode").post(checkCode);

module.exports = router;
