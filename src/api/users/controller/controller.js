const { Logger } = require("../../../loaders/logger");
const User = require('../../../models/user')
const { createUser, signup } = require('../../../repository/userRepository')

exports.createUser = (req, res) => {
  const newUser = new User(req.body.correo, req.body.password)
  createUser(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating User.",
      });
    else res.send(data);
  });
};

exports.singup = (req, res) => {
  const user = new User(req.body.correo, req.body.password);
  signup(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while validate User.",
      });
    else res.send(data);
  });
}