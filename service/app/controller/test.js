'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async aaa() {

        this.ctx.body = '<h1>home  page</h1>';
    }


}

module.exports = HomeController;