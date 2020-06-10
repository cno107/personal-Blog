import React from 'react';
import '../static/style/components/header.css'
import {Row,Col,Menu} from "antd";
import 'antd/dist/antd.css'
import {HomeOutlined,SmileOutlined,GithubOutlined } from "@ant-design/icons";

const Header = () =>{
    return (
        <div className="header">
             <Row type="flex" justify="center">
                 <Col xs={24} sm={24} md={10} lg={10} xl={14} xxl={14}>
                     <span className="header-logo">裴宏博</span>
                     <span className="header-text">后期再说写啥</span>
                 </Col>
                 <Col xs={0} sm={0} md={14} lg={14} xl={10} xxl={10}>
                     <Menu  mode="horizontal">
                         <Menu.Item key="home">
                             <HomeOutlined/>Home Page
                         </Menu.Item>
                         <Menu.Item key="video">
                             <GithubOutlined />Video
                         </Menu.Item>
                         <Menu.Item key="life">
                             <SmileOutlined/>   Life
                         </Menu.Item>
                     </Menu>
                 </Col>
             </Row>



        </div>
    )
}

export default Header;