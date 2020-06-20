


 /*function xxx(app){
     const  {router,controller} = app;

     router.get('/frontend/index',controller.frontend.home.index)

 }

module.exports =xxx;*/

 module.exports = app =>{
     const  {router,controller} = app;

     router.get('/frontend/index',controller.frontend.home.index)
     router.get('/frontend/getArticleList',controller.frontend.home.getArticleList)
     router.get('/frontend/getArticleById/:id',controller.frontend.home.getArticleById)
     //配置参数传id
     router.get('/frontend/getTypeInfo',controller.frontend.home.getTypeInfo)
     router.get('/frontend/getListByTypeId/:id',controller.frontend.home.getListByTypeId)


 }