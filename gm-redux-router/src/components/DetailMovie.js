//详情页内容
import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../init/history';
import '../plugin/commen.js';
import '../css/DetailMovie.css';


class DetailMovie extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.data;
        //如果浏览器后退 并且url已经改变值的情况下 还继续渲染数据 解决方法如下 return 掉 
        //如果不想要当前页面出现回退的情况 可以用 history.goBack 进行页面回退 操作
        if (data === undefined || JSON.stringify(data) === '{}') {
            history.goBack();
            return (<div></div>);
        }
        let dow = data.Download.map((value, key) => {
            return (
                <li key={key}>
                    {value.Sownload_Url}
                </li>
            )
        })


        return (
            <div className="moivesDetail">
                <img alt="暂无图片" className="topimgOpcity" src={data.Image_Url[0].Image_Url} />
                <p>
                    片名：{data.Name}( {data.Name_Title})
                </p>
                <p>
                    类型：{data.Category}
                </p>
                <p>
                    导演：{data.Director}
                </p>
                <p>
                    简介：{data.Decsription}
                </p>
                <p>
                    上映时间：{new Date(data.Date_Time).Format("yyyy-MM-dd hh:mm:ss")}
                </p>
                <p>
                    下载地址:{dow}
                </p>
            </div>
        )
    }
}
DetailMovie = connect(
    state => state,
)(DetailMovie)
export default DetailMovie;