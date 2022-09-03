module.exports = app => {

    const routerUser = require("./routesUsuario");
  
    app.use('/usuario', routerUser);

};
