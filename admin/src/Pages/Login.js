import  React,{useState} from 'react';
import 'antd/dist/antd.css'
import {Card,Input,Button,Spin} from "antd";
import {SmileOutlined, YoutubeOutlined} from "@ant-design/icons";
import '../static/css/Login.css';



const Login = () => {
    //用户 密码 是否正在加载
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [inLoading,setInLoading] = useState(false)

    const checkLogin = () => {
        setInLoading(true)
        setTimeout(()=>{
            setInLoading(false)
        },1000)
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