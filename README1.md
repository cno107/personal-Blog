# personal-Blog
React Hook + redux + node + mysql

# 前台开发环境

npm i create-next-app -g

npx create-next-app blog

cd blog

npm run dev

npm add @zeit/next-css

npm add antd

npm i @ant-design/icons -s

npm add babel-plugin-import

**npm run dev**



## 解析markdown

npm i -s react-markdown

```react
import ReactMarkdown from "react-markdown";
<ReactMarkdown  source={markdownTest}
                escapeHtml={false} />
```

#### md导航

npm i -s markdown-navbar

```react
import MarkdownNav from "markdown-navbar"
import  'markdown-navbar/dist/navbar.css'

<MarkdownNav
    className="article-menu"
    source={markdownTest}
     headingTopOffset={0}   <!--距离定顶部距离-->
     ordered={true}
                       />

```

+ 导航指的是 md里 # 开头的段乱
<<<<<<< HEAD
  
  - '# p03:Vue3.0基础知识讲解\n'
  
    

## 用这个解析md有高亮

npm i marked -S

npm i -S highlight.js

####  md导航

# 中台搭建egg

服务接口

npm i egg-init -g

mkdir service    //和blog并列

cd service

egg-init --type=simple

npm i

**npm run dev**    //具体去package.json里找egg-bin

#### RESTful接口介绍

RESTful是目前最流行的网络应用程序设计风格和开发方式，大量使用在移动端App上和前后端分离的接口设计。这种形式更直观并且接口也有了一定的约束性。

约束的请求方式和对应的操作。

- **GET(SELECT)** ： 从服务端取出资源，可以同时取出一项或者多项。
- **POST(CREATE)** ：在服务器新建一个资源。
- **PUT(UPDATE)** ：在服务器更新资源（客户端提供改变后的完整资源）。
- **DELETE(DELETE)** ：从服务器删除资源。



#### 连接mysql

npm i egg-mysql

```js
//config plugin
exports.mysql = {
    enable:true,
    package:'egg-mysql'
}
//config config.defalut
//配置文件去npm egg-mysql里有 ，因为最后是解构出去的所以把exports替换成config
```

接口里调用

```react
let result = await this.app.mysql.get("blog_content",{})
    console.log(result)
```



#### 数据库设计

## 前中台结合

npm i -s axios    //blog

**先进入中台 service文件**

#### <span name="api">通过api接口来获取DB</span>

```react
//注意这是异步  app-->controller-->
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

    this.ctx.body={data:results}   //这个body可以用来展示数据,也就是返回值，必须写

  }
```

#### 配置路由

+ 这里router get的地址是自己定义的 

+ 和前端跳转的地址不同
+ **这个地址用来让前端的axios来访问 也可以开启中台后 自己在页面访问**
+ **:id**
+ router.get 说人话就是
  - 前面要是来了请求，是我第一个参数的话
  - 第二个参数:我这就去**调用**controller下面的文件夹里的home组件的xxx方法
  - 这方法返回了啥啊？ 往上看这个-->**通过api接口来获取DB**

```react
//app-->router-->
//frontend.js
 module.exports = app =>{
     const  {router,controller} = app;
router.get('/frontend/index',controller.frontend.home.index)     router.get('/frontend/getArticleList',controller.frontend.home.getArticleList)   rr.get('/frontend/getArticleById/:id',controller.frontend.home.getArticleById)
     //配置参数 要在后面传:id

 }
 

```

```react
//app-->router.js总路由

module.exports = (app) => {
  //上面暴露出来的函数 要传一个参数  
  require('./router/frontend')(app)  
}; 
```

#### 前台用axios获取数据

###### 页面链接写法

```<Link href={{pathname:'/detailed',query:{id:item.id}}} >```

进入前台blog文件

+ 拿detailed.js做例子，因为这玩意涉及到了url传id
+ 说白了 
  - 点击首页第二个文章
    - ```<Link href={{pathname:'/detailed',query:{id:item.id}}} >```
    - 这个地址是跳转地址
  - 前台(详细页)获取id=2
    - 就是跳转到的那个
    - 通过getInitialProps 函数里自带的上下文参数 ， <font color="hotpink">第二段</font>
  - 通过axios来访问中台api接口    <font color="hotpink">第三段</font>
    - 别忘完了把id=2拼进来
    - 对了 你这axois请求 也得写再 组件的getInitialProps 函数里
    - 而且还得在里面整个异步，要不然你请求个鸡毛
  - 中台接受到请求，用sql语句在数据库里找id=2的文章的所有信息 并返还
    - 就是中台在路由里瞅了一眼 ( **见:路由配置**)
    - 路由一看woc你请求的就是这个地址啊！还带着参数id
    - 行行行，我这就controller里调用它
  - axios再用then里自带的参数response (英语懂啥意思不)
    - 返回值用resolve(res.data.自己看你要啥)
  - 函数组件接受过来，渲染
    - 为啥能接收？  <font color="hotpink">第一段</font>
    - ？？？你瞅瞅axios是写在哪个函数里的
+ axios地址看不懂？
  - 本地地址+端口+配置路由里接口api的地址+拼串加一个变量id

```react
//pages-->Detailed.js
import axios from 'axios'

//这个参数可以自动接收axios的返回值
//也就是说这个参数list里是我db的返回值，我可以拿里面的内容来渲染页面
const Detailed = (list) => {return(渲染)} 
```

```react
//给这个函数组件加一个getInitialProps方法 ，别问自己百度
Detailed.getInitialProps = async (ctx) =>{
    console.log(ctx.id)  //有一个上下文的参数，自己打出来看看就知道了
    let id = ctx.query.id; /1获取的就是首页跳转时，在url拼的参数id
```

```react
 /!做一个propmise的异步函数
    const promise = new Promise((resolve, reject)=>{
        /！用axios 
     //url是 本地地址+端口+配置路由里的地址+拼串加一个变量id
        axios('http://127.0.0.1:7002/frontend/getArticleById/'+id).then(
            (res)=>{
                console.log(res)
                resolve(res.data.data[0])
            }
        )

    })
    return await promise   //propmise函数必须要有返回值
}

```

#### 然后出一堆bug？？？

+ 404
  - 就是地址写错了呗
  - 路由里，前台页面链接里，axios里，凡是有地址都瞅瞅
  - 这三类的地址写法都不一样
  - 参数用传不，传对没
+ 500
  - 这种情况800%都是SQL语句写错了
  - 拿个最简单的sql语句试一下 看看是不是sql语句的错误
  - 然后看下 <a href="#api">通过api接口来获取DB</a>  模仿一下
  - 讲道理要不是sql语句出问题了 ，那么就是你有问题了

### 解决跨域cors问题

npm i -s egg-cors    //service

```react
//config --> pulgin.js
exports.cors = {
    enable:true,
    package:'egg-cors'
}

//config.default.js
config.security ={     
    csrf:{enable:false},
    domainWhiteList:['*']
  };
  config.cors = {
    origin:'*',
    allowMethods:'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
```



# 后台开发环境

根目录下

create-react-app admin

npm i -S react-router-dom

npm install antd --save

npm i @ant-design/icons -S

# 上传服务器

打包 npm  run build  前端代码



# Nginx

404及500错误界面  /usr/share/nginx/html

配置 vim /etc/nginx/conf.d/default.conf

配置   /etc/nginx/nginx.conf

ps aux | grep nginx

pkill -9 nginx    //stop

nginx               //start

## 端口设置

+ default.conf文件同文件夹下 新建一个.conf文件
+ 查看linux目前开放的端口
  - firewall-cmd --zone=public --list-ports
+ 阿里云 安全组 里 开放端口

# 拷贝DB

+ 从datagrip导出sql
  - 数据库右键--》 Export with mysqldump
  - mysqldump路径 ```D:/107-IDE/mysql-5.7.30-winx64/bin/mysqldump.exe```

+ 打开服务器的mysql
  - mysql  -r root -p
  - create database 数据库名;
  - show databases;
  - use 数据库名;
  - source sql文件的路径 ;         source   /xxx.sql
  - show tables ;       //检查





# PM2进程守护

```shell
npm install pm2 -g
pm2 list
pm2 start npm -- run start
pm2 monit
pm2 stop all
pm2 delete all
pm2 restart all
pm2 reload all

#pm2 动作 all替换成进程id
```

# 部署遇到的坑

1. 区分 生产环境和开发环境

   - npm run start之前需要 run build进行打包
   - **之后每次对代码进行操作都需要重新打包再运行start**

2. 前后端端口不能一样

   - 原本都为 http://localhost:3000  

   - ```json
         "dev": "next dev -p 3001",
         "build": "next build",
         "start": "next start -p 3001",
     ```

3. 文件权限问题

   - ll  查看
   - chmod 777 -R ./

4. 进程守护

   - nextjs需要用pm2守护
   - eggjs自带进程守护

5. nginx   404页面问题



# 服务器重启

+ 开启nginx
+ 开启pm2  守护前台
+ 开启eggjs 守护中台api

# 残留问题

+ 前台nextjs的进程守护
+ 由于后台入口使用的是 / 根目录，导致前台需要换url
  - apiURL文件里改试一试



