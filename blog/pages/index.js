import React,{useState} from 'react'
import Link from "next/link";
import Head from 'next/head'
import {List,Row,Col} from 'antd'
import {FolderOpenTwoTone,
    FireTwoTone,
    CalendarTwoTone
} from '@ant-design/icons'

import Header from '../components/Header'
import Author from "../components/Author";
import Ad from '../components/Ad';
import Footer from "../components/Footer";
import '../static/style/pages/index.css'
import '../static/style/components/author.css'
import '../static/style/components/ad.css'
import '../static/style/components/footer.css'

import axios from 'axios'

//自动获取axios的返回值，且必须是对象
const Home = (list) => {
    const [mylist,setMylist] = useState(list.data)

    return (
        <div className="container">
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />

            </Head>
            <Header/>
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left"  xs={24} sm={24} md={16} lg={18} xl={14}>
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
                                <div className="list-context">{item.article_content}</div>
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

Home.getInitialProps = async () =>{
    const pormise = new Promise((resolve, reject)=>{
        axios('http://127.0.0.1:7001/frontend/getArticleList').then(
            (res)=>{
                console.log(res.data)
                resolve(res.data)
            }
        )
    })

    return await pormise  //async的函数必须有await的返回值
}

export default  Home