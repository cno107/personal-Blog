
import React,{useState,useEffect} from 'react';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
import servicePath from "../config/ApiURL";
const { confirm } = Modal;


const ArticleList = (props) =>{
    const [list,setList] = useState([])

    useEffect(()=>{
        getList()
    },[])

    const getList = ()=>{
        axios({
            method:'get',
            url: servicePath.getArticleList,
            withCredentials: true,
            header:{ 'Access-Control-Allow-Origin':'*' }
        }).then(
            res=>{
                console.log(res.data.data)
                setList(res.data.data)
            }
        )
    }

    const deleteArticle = (id)=>{
        confirm({
            title: 'Are you sure to delete this article?',
            content: 'If you click [OK] button , it will remove from your PC forever!!!',
            onOk() {
                axios(servicePath.deleteArticle+id,{ withCredentials: true}).then(
                    res=>{
                        message.success('article delete success')
                        getList()
                    }
                )
            },
            onCancel() {
                message.success('Oh , Nothing happened')
            },
        });
    }

    const editArticle = (id)=>{
        axios(servicePath.editArticle+id,{ withCredentials: true}).then(
            res=>{
                message.success('article delete success')
                console.log(res.data.data)
                props.history.push('/index/add/'+id)
            }
        )
    }

    return(
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={3}>
                            <b>集数</b>
                        </Col>
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={3}>
                                {item.typeName}
                            </Col>
                            <Col span={3}>
                                {item.addTime}
                            </Col>
                            <Col span={3}>
                                共<span>{item.part_count}</span>集
                            </Col>
                            <Col span={3}>
                                {item.view_count}
                            </Col>

                            <Col span={4}>
                                <Button onClick={()=>{editArticle(item.id)}} type="primary">Edit </Button>&nbsp;

                                <Button onClick={()=>{deleteArticle(item.id)}} >Delete </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )
}

export default ArticleList;