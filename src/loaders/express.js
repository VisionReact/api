const express = require('express');
const cors = require('cors');
const config = require('../config');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer')

const expressUp = app => {
  /**
   * Health Check endpoints
   * @TODO Explain why they are here
   */
  app.get('/status', (_req, res) => {
    res.send("it's Ok").status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  //set morgan
  app.use(morgan('dev'))

  // Transforms the raw string of req.body into json
  app.use(express.json());

  //
  const Multer = multer({
    storage: multer.memoryStorage(),
    limits: 1024 * 1024
  })

  // Load API routes
  //app.use(config.api.prefix, routes(app));
  require('../routes/index.js')(app);

};


module.exports = {
  expressLoader: expressUp,
};
