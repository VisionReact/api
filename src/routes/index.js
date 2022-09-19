module.exports = app => {

    const routerUser = require("./routesUsuario");
    const routerDocument = require("./routesDocumento")
  
    app.use('/usuario', routerUser);
    app.use('/documento', routerDocument);

};
