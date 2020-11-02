let ipURL = 'http://39.106.163.253/bxx/backend/';

let servicePath = {
    checkLogin: ipURL+'checkLogin',  //检查用户名密码
    getTypeInfo:ipURL+'getTypeInfo',//获取文章类别信息
    addArticle:ipURL+'addArticle', //添加文章
    updateArticle:ipURL+'updateArticle', //修改文章
    getArticleList:ipURL+'getArticleList',//获取文件列表

    //这俩需要后面接参数 所以得 加一个 /
    deleteArticle:ipURL+'deleteArticle/', //删除文章
    editArticle:ipURL+'editArticle/', //修改文章

}

export default  servicePath