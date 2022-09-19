const router = require("express").Router();
const documento = require("../api/documento/controller/documentoController");
const multer = require("multer");
const upload = require("../services/firebase");

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

router.post("/upload", Multer.single("imagen"),upload);

module.exports = router;
