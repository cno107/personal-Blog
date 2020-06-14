import React from 'react'
import Link from "next/link";
import Head from 'next/head'
import {Row,Col,Breadcrumb,Affix} from 'antd'
import {} from '@ant-design/icons'

import axios from 'axios'
//markdown部分
import marked from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from 'tocify';


import Header from '../components/Header'
import Author from "../components/Author";
import Ad from '../components/Ad';
import Footer from "../components/Footer";
import '../static/style/pages/detailed.css'
import '../static/style/components/author.css'
import '../static/style/components/ad.css';
import '../static/style/components/footer.css'
import {CalendarTwoTone,
    FolderOpenTwoTone,
    FireTwoTone} from "@ant-design/icons";


//test用md文件 上线后可以删除
import markdownTest from "../public/js/markdownTest"





const Detailed = (props) =>{

   /* const tocify = new Tocify()
    const renderer = new marked.Renderer();

    renderer.heading = (text,level,raw) =>{
        // ### phb   ###是level
        const anchor = tocify.add(text,level)
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix">
                <h${level}>${text}</h${level}>
                  </a>\n`
    }
    marked.setOptions({
        renderer:renderer,
        gfm:true,
        pedantic:false,
        sanitize:false,
        tables:true,
        breaks:false,
        smartLists:true,
        highlight:function (code) {
            return hljs.highlightAuto(code).value
        }
    })
    let html =marked( props.article_content);
*/



    return (
        <div className="container">
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />

            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">Home page</a></Breadcrumb.Item>
                            <Breadcrumb.Item><a href="/list">Video</a></Breadcrumb.Item>
                            <Breadcrumb.Item>???</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div>
                        <div className="detailed-title">React练习博客教程</div>
                        <div className="list-icon center">
                            <span><CalendarTwoTone />2020-06-10</span>
                            <span><FolderOpenTwoTone />视频教材</span>
                            <span><FireTwoTone />7864人</span>
                        </div>
                        <div className="detailed-content"
                             dangerouslySetInnerHTML={{__html:html}}
                        >
                        </div>
                    </div>


                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Ad/>
                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">atalog</div>

                        </div>
                    </Affix>

                </Col>
            </Row>
            <Footer/>
        </div>
    )
}


Detailed.getInitialProps = async (ctx) =>{
    console.log(ctx.id)
    let id = ctx.query.id;

    const promise = new Promise((resolve, reject)=>{
        axios('http://127.0.0.1:7001/frontend/getArticleById/'+id).then(
            (res)=>{
                console.log(res)
                resolve(res.data.data[0])
            }
        )

    })
    return await promise
}


export default Detailed
