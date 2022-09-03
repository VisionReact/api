const router = require('express').Router();
const user = require("../api/users/controller/controller");

router.get("/findAll", user.findAll);

module.exports = router