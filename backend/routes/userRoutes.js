const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/usercontroller");

router.get("/", getUsers);

module.exports = router;