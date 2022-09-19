const { sql } = require("../loaders/mysql");
const { Logger } = require("../loaders/logger");

uploadImage = (documento, result) => {
    const query = `INSERT INTO documento
    (ruta,extension,fecha_creacion,nombre,id_usuario) 
    values 
    ('${documento.ruta}', '${documento.extension}', NOW(), '${documento.nombre}','${documento.usuario}');`;

    return new Promise((resolve, reject) => {
      sql.query(query, (err, res) => {
        if (err) {
          Logger.error("error: ", err);
          result(err, null);
        }

        Logger.info("created document: ", { id: res.insertId, ...documento });
        result(null, { id: res.insertId, ...documento });
      });
    });
  
};

module.exports = {
  uploadImage
};
