const router = require('express').Router();
const user = require("../api/users/controller/controller");

router.post("/create", user.createUser);

module.exports = router