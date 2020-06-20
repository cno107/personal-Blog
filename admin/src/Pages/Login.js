import  React,{useState} from 'react';
import 'antd/dist/antd.css'
import {Card,Input,Button,Spin,message} from "antd";
import {SmileOutlined, YoutubeOutlined} from "@ant-design/icons";
import '../static/css/Login.css';
import servicePath from "../config/ApiURL";
import axios from 'axios';



const Login = (props) => {
    //用户 密码 是否正在加载
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [inLoading,setInLoading] = useState(false)

    const checkLogin = () => {
        setInLoading(true)
       if(!userName){
           message.error('用户名不能为空')
           setInLoading(false)
           return false;
       }else if(!password){
           message.error('密码不能为空')
           setInLoading(false)
           return false;
       }

       let dataProps = {
           'userName':userName,
           'password':password
       }

       axios({
           method:'post',
           url:servicePath.checkLogin,
           data:dataProps,
           withCredentials:true
       }).then(
           res=>{
               setInLoading(false)
               if(res.data.data==="Login Success"){

                  localStorage.setItem('openId',res.data.openId)
                  props.history.push('./index')

               }else if(res.data.data==="Login Failed"){
                   message.error('Incorrect username or password.')
               }
           }
       )


    }

    return (
        <div className="login-div">
            <Spin tip="Loading……" spinning={inLoading}>
                <Card title="PHB blog system" bordered={true} style={{width:400}}>
                    <Input
                       id="userName"
                       size="large"
                       placeholder="Enter use Name"
                       prefix={<YoutubeOutlined/>}
                       onChange={(e)=>{
                           setUserName(e.target.value)
                       }}
                    /><br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter password"
                        prefix={<SmileOutlined/>}
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    /><br/><br/>
                    <Button type="primary" size="large" block
                            onClick={checkLogin} >Sign in
                    </Button>

                </Card>
            </Spin>
        </div>
    )
}

export default Login;