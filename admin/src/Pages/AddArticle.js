import React, {useState,useEffect} from 'react';
//markdown部分
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import '../static/css/AddArticle.css'
import {Button, Row, Col, Input, Select, DatePicker, message} from 'antd'
import axios from 'axios';
import servicePath from "../config/ApiURL";
import ArticleList from "./ArticleList";
const {Option} = Select;
const {TextArea} =Input;

const AddArticle = (props) => {

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //可编辑的文章内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //呈现的文章内容,转换为了md
    const [introduce,setIntroduce] = useState()            //编辑的简介内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState('等待编辑') //呈现的简介内容，转换为了md
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState() //选择的文章类别

    useEffect(()=>{
        getTypeInfo()
        if(props.match.params.id){
            setArticleId(props.match.params.id)
            getNeedEditArticle()
        }

    },[])

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

    const getTypeInfo = () =>{
        axios({
            method:'get',
            url:servicePath.getTypeInfo,
            header:{ 'Access-Control-Allow-Origin':'*' },
            withCredentials:true
        }).then(
            res=>{
                if(res.data.data===777){
                    console.log(res.data.dataMessage)
                    //Waring :Sorry You need to login
                    localStorage.removeItem('openId')
                    props.history.push('/')
                }else {
                    setTypeInfo(res.data.data)
                }
            }
        )
    }

    //把改变的值 保存给useState
    const changeArticleContent = (e) =>{
        setArticleContent(e.target.value);
        let html = marked(e.target.value);
        setMarkdownContent(html);
    }
    const changeIntroduceContent = (e) =>{
        setIntroduce(e.target.value);
        let html = marked(e.target.value);
        setMarkdownIntroduce(html);
    }
    const selectTypeHandler = (value) =>{
        setSelectType(value)
        console.log("当前文本类型为: "+value)
    }
    const showDateHandler = (date,dateString)=>{
        setShowDate(dateString)
        console.log("当前发布时间为: "+dateString)
    }
    const changeArticleTitle = (e) =>{
        let va = e.target.value;
        setArticleTitle(va);
        let reg = /\/$/ ; //结尾输入/ 来在控制台打印current title

        if(va.match(reg) && va.match(reg)[0]==='/'){
                console.log("当前title为: "+e.target.value)
        }



    }

    //submit article to db
    const submitArticle = () =>{
        if(!selectedType){
            message.error('must have a type for article')
            return false
        }else if(!articleTitle){
            message.error('must have a title for article')
            return false
        }else if(!articleContent){
            message.error('must have content for article')
            return false
        }else if(!introduce){
            message.error('must have a introduction for article')
            return false
        }else if(!showDate){
            message.error('must have an date for article')
            return false
        }
        else{
           // message.success('has been passed check of article')

            let dataProps={}   //传递到接口的参数
            dataProps.type_id = selectedType;
            dataProps.title = articleTitle;
            dataProps.article_content =articleContent;
            dataProps.introduce =introduce;
            let dateText= showDate.replace('-','/') //把字符串转换成时间戳
            dataProps.addTime = dateText;
           // dataProps.addTime =(new Date(dateText).getTime())/1000;
            
            //  ==0 是添加新文章  !=0 是修改文章
            if(articleId===0){
                console.log('articleId=:'+articleId)
                dataProps.view_count =Math.ceil(Math.random()*100)+1000
                axios({
                    method:'post',
                    url:servicePath.addArticle,
                    data:dataProps,
                    withCredentials: true
                }).then(
                    res=>{
                        setArticleId(res.data.insertId)
                        if(res.data.isSuccess){
                            message.success('article has been saved into DB ')
                        }else{
                            message.error('article save failed');
                        }

                    }
                )
            }
            else{
                dataProps.id = articleId
                axios({
                    method:'post',
                    url:servicePath.updateArticle,
                    header:{ 'Access-Control-Allow-Origin':'*' },
                    data:dataProps,
                    withCredentials: true
                }).then(
                    res=>{
                        if(res.data.isSuccess){
                            message.success('update successfully')
                        }else{
                            message.error('update failed');
                        }

                    }
                )
            }
        }
    }


    //从编辑页面跳转 过来的，
    //读取url里的id，把当前id的东西渲染在页面上

    const getNeedEditArticle =  () =>{

        //拿到 需要编辑的文章 索引 (位于url后面)
        const editId =  props.match.params.id

        axios({
            method:'get',
            url:servicePath.editArticle+editId,
            withCredentials: true
        }).then(
            res=>{
                const xx = res.data.data
                console.log(xx)
                //把原来的内容全部打出来
                setArticleTitle(xx.title);
                setSelectType(xx.type_id);
                setArticleContent(xx.article_content);
                setIntroduce(xx.introduce);
                setShowDate(xx.addTime.replace('/','-'));

                let html=marked(xx.article_content)
                setMarkdownContent(html)
                let tmpInt = marked(xx.introduce)
                setMarkdownIntroduce(tmpInt)

                setSelectType(res.data.data.type_id)





            }
        )

    }












    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                placeholder="博客标题"
                                size="large"
                                onChange={changeArticleTitle}
                                />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue="select article type" size="large" onChange={selectTypeHandler}>

                                {

                                    typeInfo.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.Id}>{item.typeName}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row><br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                            className="markdown-content"
                            rows={34}
                            placeholder="文章内容"
                            value={articleContent}
                            onChange={changeArticleContent}
                            />
                         </Col>
                        <Col span={12}>
                            <div className="show-html"
                                 dangerouslySetInnerHTML={{__html:markdownContent}}>

                            </div>
                        </Col>

                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size="large">暂存文章</Button>&nbsp;&nbsp;
                            <Button type="primary"  size="large" onClick={submitArticle}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
                                value={introduce}
                                onChange={changeIntroduceContent}
                            />
                            <br/><br/>
                            <div className="introduce-html"
                                dangerouslySetInnerHTML={{__html:markdownIntroduce}}>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                   onChange={showDateHandler}
                                   placeholder="发布日期"

                                   size="large"
                                />

                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}




export default AddArticle;