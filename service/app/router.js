'use strict';

/**
 * @param {Egg.Application} app - egg application
 *
 *
 */



module.exports = (app) => {

  require('./router/FE-router')(app);
  require('./router/BE-router')(app);

};
