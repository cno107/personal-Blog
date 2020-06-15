
import React,{useState,useEffect} from 'react'
import Link from "next/link";
import Head from 'next/head'
import {List,Row,Col,Breadcrumb} from 'antd'
import {FolderOpenTwoTone,
    FireTwoTone,
    CalendarTwoTone
} from '@ant-design/icons'
//markdown部分
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import Header from '../components/Header'
import Author from "../components/Author";
import Ad from '../components/Ad';
import Footer from "../components/Footer";

import '../static/style/components/author.css'
import '../static/style/components/ad.css'
import '../static/style/components/footer.css'

import axios from 'axios';
import servicePath from "../config/apiURL";
import Home from "./index";


const ListKKK= (listInType) =>{
    const [mylist,setMylist] = useState(listInType.data)
    useEffect(()=>{
        setMylist(listInType.data)
    })

    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    return (
        <div className="container">
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />

            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left"  xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">Home page</a></Breadcrumb.Item>
                            <Breadcrumb.Item>Video</Breadcrumb.Item>
                            <Breadcrumb.Item><a href="/">Home page</a></Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <List
                        header={<div>最新日志</div>}
                        itemLayout="vertical"
                        dataSource={mylist}
                        renderItem={item=>(
                            <List.Item>
                                <div className="list-title">
                                    <Link href={{pathname:'/detailed',query:{id:item.id}}} >
                                        <a>{item.title}</a>
                                    </Link>

                                </div>
                                <div className="list-icon">
                                    <span><CalendarTwoTone />{item.addTime}</span>
                                    <span><FolderOpenTwoTone />{item.typeName}</span>
                                    <span><FireTwoTone />{item.view_count}人</span>
                                </div>
                                <div className="list-context"
                                  dangerouslySetInnerHTML={{__html:marked(item.article_content)}}>
                                </div>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author/>
                    <Ad/>
                </Col>
            </Row>
            <Footer/>
        </div>
    )
}

ListKKK.getInitialProps = async (ctx) =>{

    let id = ctx.query.id;

    const promise = new Promise((resolve, reject)=>{
        axios(servicePath.getListByTypeId+id).then(
            (res)=>{
                resolve(res.data)
            }
        )
    })

    return await promise  //async的函数必须有await的返回值
}


export default ListKKK
