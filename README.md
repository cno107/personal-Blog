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