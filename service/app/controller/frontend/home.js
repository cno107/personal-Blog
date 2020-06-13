'use strict';

const Controller = require('egg').Controller;



class HomeController extends Controller {


  async index() {

    const { ctx } = this;
    ctx.body = 'i';
  }
  async getArticleList(){
    let sql = 'SELECT article.id as id,' +
              'article.title as title,'+
        'article.article_content as article_content,'+
              'article.introduce as introduce,'+
              'article.addTime as addTime,'+
              'article.view_count as view_count,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id';
    const results = await this.app.mysql.query(sql);

    this.ctx.body={data:results}

  }

  async getArticleById(){
    let id = this.ctx.params.id;

    let sql = 'SELECT article.id as id,' +
        'article.title as title,'+
        'article.article_content as article_content,'+
        'article.introduce as introduce,'+
        'article.addTime as addTime,'+
        'article.view_count as view_count,'+
        'type.typeName as typeName, '+
        'type.Id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id;


    const results = await this.app.mysql.query(sql);

    this.ctx.body={data:results}

  }



}

module.exports = HomeController;

