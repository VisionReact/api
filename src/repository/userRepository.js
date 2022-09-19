const { sql } = require("../loaders/mysql");
const { Logger } = require("../loaders/logger");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

createUser = (user, result) => {
  bcrypt.hash(user.password, saltRounds).then(function (hash) {
    const query = `INSERT INTO usuario
    (correo,password,fecha_creacion) 
    values 
    ('${user.correo}', '${hash}', NOW());`;

    return new Promise((resolve, reject) => {
      sql.query(query, (err, res) => {
        if (err) {
          Logger.error("error: ", err);
          result(err, null);
        }

        Logger.info("created user: ", { id: res.insertId, ...user });
        result(null, { id: res.insertId, ...user });
      });
    });
  });
};

signup = (user, result) => {
    const query = `select count(*) from usuario u where u.correo = '' and u.password = ''`;
    return new Promise((resolve, reject) => {
      sql.query(
        `select count(*) from usuario u where u.correo = ? and u.password = ?`,
        user.correo, user.password,
        (err, res) => {
          if (err) {
            Logger.error("error: ", err);
            result(err, null);
          }

          Logger.info("Usuario: ", res[0]);
          result(null, res[0].result);
        }
      );
    });
}

module.exports = {
  createUser,
  signup
};
