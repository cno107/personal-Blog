'use strict';

const Controller = require('egg').Controller;

class BeController extends Controller {

    async index() {

        const {ctx} = this;
        ctx.body = 'be api';
    }

    async checkLogin(){
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;

        const sql = "SELECT userName FROM admin_user "+
                    "WHERE userName= '"+userName+"' AND "+
                    "password='"+password+"' "

        const res = await this.app.mysql.query(sql)

        if(res.length > 0){
            console.log('验证完用户名密码了，我要创建session了')
            let openId = new Date().getTime()
            this.ctx.session.openId={'openId':openId}

            this.ctx.body={'data':'Login Success','openId':openId}
        }else{
            this.ctx.body={'data':'Login Failed'}
        }
    }

    async getTypeInfo() {
        const {ctx} = this;
        const resType = await this.app.mysql.select('type')

        ctx.body = {data:resType}
    }

    async addArticle(){
        let tmpArticle = this.ctx.request.body;
        const result = await this.app.mysql.insert('article',tmpArticle);
        const insertSuccess = result.affectedRows === 1;
        const insertId = result.insertId;

        this.ctx.body={
            isSuccess:insertSuccess,
            insertId : insertId
        }
    }


     async  updateArticle (){
        let tempArticle = this.ctx.request.body;

        const result = await this.app.mysql.update('article',tempArticle);
        const updateSuccess = result.affectedRows === 1
         //console.log(updateSuccess)
        this.ctx.body = {
            isSuccess : updateSuccess
        }
    }


    async getArticleList(){
        let sql = 'SELECT article.id as id,' +
            'article.title as title,'+
            'article.article_content as article_content,'+
            'article.introduce as introduce,'+
            'article.addTime as addTime,'+
            'article.view_count as view_count,'+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.Id '+
            'ORDER BY article.Id DESC';
        const results = await this.app.mysql.query(sql);

        this.ctx.body={data:results}

    }

     async deleteArticle(){
        let id = this.ctx.params.id
         const res= await this.app.mysql.delete('article',{'Id':id})
         this.ctx.body ={data:res}
     }

     async editArticle(){
         let id = this.ctx.params.id;
         const res= await this.app.mysql.get('article',{'Id':id})
         this.ctx.body ={data:res}
     }




}



module.exports = BeController;
