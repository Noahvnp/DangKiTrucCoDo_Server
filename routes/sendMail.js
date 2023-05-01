const sendMailController = require("../controllers/sendMailController");

const router = require("express").Router();

router.post("/", sendMailController);

module.exports = router;
