const { Logger } = require("../../../loaders/logger");
const Documento = require("../../../models/documento");
const { uploadImage } = require("../../../repository/documentoRepository");


exports.uploadImage = (req, res) => {
  console.log(req.file)
  /*const newDocument = new Documento(req.body.ruta, req.body.extension, req.body.nombre, req.body.usuario);
  uploadImage(newDocument, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while register Document.",
      });
    else res.send(data);
  });*/
};
