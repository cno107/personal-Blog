import React, {Component} from 'react';
import {Avatar,Divider} from "antd";
import {GithubOutlined,
        QqOutlined,
         WechatOutlined,
         CarTwoTone
         } from '@ant-design/icons'
const Author = () =>{
    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="" icon={<CarTwoTone />}/></div>
            <div className="author-introduction">
                啊大苏打开会就开会结果黄金矿工好几个号激光焊接计划骨结核34跟好几个
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className="account"/>
                <Avatar size={28} icon={<QqOutlined />} className="account"/>
                <Avatar size={28} icon={<WechatOutlined />} className="account"/>
            </div>

        </div>
    )
}

export default Author;