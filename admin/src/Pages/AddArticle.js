import React, {useState,useEffect} from 'react';
//markdown部分
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import '../static/css/AddArticle.css'
import {Button,Row,Col,Input,Select,DatePicker} from 'antd'
const {Option} = Select;
const {TextArea} =Input;

const AddArticle = () => {

    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //可编辑的文章内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //呈现的文章内容,转换为了md
    const [introduce,setIntroduce] = useState()            //编辑的简介内容
    const [markdownIntroduce,setMarkdownIntroduce] = useState('等待编辑') //呈现的简介内容，转换为了md
    const [showDate,setShowDate] = useState()   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别

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




    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                placeholder="博客标题"
                                size="large"
                                />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue="1" size="large">
                                <Option value="1">视频教程</Option>
                            </Select>
                        </Col>
                    </Row><br/>
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                            class="markdown-content"
                            rows={34}
                            placeholder="文章内容"
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
                            <Button type="primary"  size="large">发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <br/>
                            <TextArea
                                rows={4}
                                placeholder="文章简介"
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