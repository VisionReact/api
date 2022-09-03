const express = require('express');
const config = require('./config/index');
const { Logger } = require('./loaders/logger');

async function startServer() {
    const app = express();

    const loader = await require("./loaders/index");
    loader.expressApp(app);

    app.listen(config.port, () => {
      Logger.debug(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################          
      
      ##     ## ####  ######  ####  #######  ##    ## 
      ##     ##  ##  ##    ##  ##  ##     ## ###   ## 
      ##     ##  ##  ##        ##  ##     ## ####  ## 
      ##     ##  ##   ######   ##  ##     ## ## ## ## 
       ##   ##   ##        ##  ##  ##     ## ##  #### 
        ## ##    ##  ##    ##  ##  ##     ## ##   ### 
         ###    ####  ######  ####  #######  ##    ##
                                                                                                         
    `);
    }).on('error', err => {
        Logger.error(err);
        process.exit(1);
    });

}

startServer();