


module.exports = app =>{
    const  {router,controller} = app;
    let adminauth = app.middleware.adminauth();
    router.get('/backend/index',controller.beController.index);
    router.post('/backend/checkLogin',controller.beController.checkLogin);  //登录，post，
    router.get('/backend/getTypeInfo',adminauth,controller.beController.getTypeInfo); //be获取文章列表，路由守卫
    router.post('/backend/addArticle',adminauth,controller.beController.addArticle);  //添加文章，post，路由守卫
    router.post('/backend/updateArticle',adminauth,controller.beController.updateArticle);//修改文章，post，路由守卫
    router.get('/backend/getArticleList',adminauth,controller.beController.getArticleList);//获得文章列表
    router.get('/backend/deleteArticle/:id',adminauth,controller.beController.deleteArticle); //删除文章
    router.get('/backend/editArticle/:id',adminauth,controller.beController.editArticle); //修改文章 (获取指定id的所有相关信息)






}