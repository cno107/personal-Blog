let ipURL = 'http://39.106.163.253/fxx/frontend/';

let servicePath = {
    getArticleList: ipURL+'getArticleList',  //首页api
    getArticleById: ipURL+'getArticleById/', //详细页api,后面接参数所以得加 /
    getTypeInfo :   ipURL+'getTypeInfo',   //获取头部导航 文章类别
    getListByTypeId:ipURL+'getListByTypeId/' // 根据类别id获取文章list,  后面接参数所以得加 /
}

export default  servicePath