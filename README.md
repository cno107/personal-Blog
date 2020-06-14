# personal-Blog
React Hook + redux + node + mysql

## 前台开发环境

npm i create-next-app -g

npx create-next-app blog

cd blog

npm run dev

npm add @zeit/next-css

npm add antd

npm i @ant-design/icons -s

npm add babel-plugin-import





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
  - '# p03:Vue3.0基础知识讲解\n'





## 中台搭建

服务接口

npm i egg-init -g

mkdir service    //和blog并列

cd service

egg-init --type=simple

npm i

npm run dev    //具体去package.json里找egg-bin

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

