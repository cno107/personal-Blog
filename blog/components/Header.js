import React,{useState,useEffect}  from 'react';
import '../static/style/components/header.css'
import {Row,Col,Menu} from "antd";
import 'antd/dist/antd.css'
import {HomeOutlined,SmileOutlined,GithubOutlined ,
    YoutubeOutlined,MessageOutlined
} from "@ant-design/icons";
import Router from "next/router";
import Link from 'next/Link';
import axios from 'axios'
import servicePath from "../config/apiURL";
import Home from "../pages";

const Header = () =>{


    const [navArray , setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    setNavArray(res.data.data)
                    return res.data.data
                }
            )
            //setNavArray(result)
        }
        fetchData();

    },[])

    const handleClick = (e)=>{
        if(parseInt(e.key)===0){  //这里的k值是“0” ，这是个字符串 懂了吧
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        }
    }

    return (
        <div className="header">
             <Row type="flex" justify="center">
                 <Col xs={24} sm={24} md={10} lg={10} xl={14} xxl={14}>
                     <span className="header-logo">
                           <Link href={{pathname:'/index'}}>
                              <a>裴宏博</a>
                          </Link>
                     </span>
                     <span className="header-text">后期再说写啥</span>
                 </Col>
                 <Col xs={0} sm={0} md={14} lg={14} xl={10} xxl={10}>
                     <Menu  mode="horizontal" onClick={handleClick} >
                         <Menu.Item key="0">
                                <HomeOutlined/>Home Page
                         </Menu.Item>
                         {
                             navArray.map((item,index)=>{
                                 switch(item.Id){
                                     case 1 :
                                         return (
                                             <Menu.Item key={item.Id}>
                                                 <YoutubeOutlined />{item.typeName}
                                             </Menu.Item>
                                         )  ;
                                     case 2 :
                                         return (
                                             <Menu.Item key={item.Id}>
                                                 <MessageOutlined />{item.typeName}
                                             </Menu.Item>
                                         )  ;
                                     case 3 :
                                         return (
                                             <Menu.Item key={item.Id}>
                                                 <SmileOutlined />{item.typeName}
                                             </Menu.Item>
                                         )  ;


                                 }


                             })
                         }

                     </Menu>
                 </Col>
             </Row>



        </div>
    )

}


export default Header;