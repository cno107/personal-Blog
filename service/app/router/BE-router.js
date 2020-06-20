


module.exports = app =>{
    const  {router,controller} = app;

    router.get('/backend/index',controller.beController.index);



}