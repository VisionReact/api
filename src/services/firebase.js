var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");
const { uploadImage } = require("../repository/documentoRepository");
const Documento = require('../models/documento')

const BUCKET = "moneyvision-13d0a.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const upload = (req, res, next) => {
  if (!req.file) return next();

  const imagen = req.file;
  const nomFile = Date.now() + "." + imagen.originalname.split(".").pop();

  const file = bucket.file(nomFile);

  const stream = file.createWriteStream({
    metadata: {
      contentType: imagen.mimetype,
    },
  });

  stream.on("error", (e) => {
    console.error(e);
  });

  stream.on("finish", async () => {
    await file.makePublic();
    req.file.firebaseUrl = `http://storage.googleapis.com/${BUCKET}/${nomFile}`;
    const newDocument = new Documento(
      req.body.ruta,
      req.body.extension,
      req.body.nombre,
      req.body.usuario
    );
    uploadImage(newDocument, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while register Document.",
        });
      else res.send(data);
    });
    next();
  });

  stream.end(imagen.buffer);
};

module.exports = upload;
