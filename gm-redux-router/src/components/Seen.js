//列表内容
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { movieDetail, showNavFlgChange } from '../actions';
import history from '../init/history';
import '../plugin/commen.js';
import '../css/NotSeen.css';

class Seen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let data = this.props.data;
        let list;
        if (data === undefined || data === '暂无数据') {
            list = "暂无数据";
        } else {
            list = data.map((e, index) => {
                return (
                    <li key={index} onClick={(e) => {
                        e.defaultPrevented;
                        this.props.onClick(data[index])
                    }}>
                        <img alt={e.Name} className="notSeenImageUrl" src={e.Image_Url[0].Image_Url} />
                        <p className="notSeenName">{e.Name}</p>
                        <p className="notSeenDateTime">{new Date(e.Date_Time).Format("yyyy-MM-dd")}</p>
                    </li>
                )
            })
        }
        return (
            <ul className="notSeenUl">
                {list}
            </ul>
        )
    }
}
export default Seen;