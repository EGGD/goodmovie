import React, { Component } from 'react';
import '../plugin/commen.js';
import '../css/NotSeen.css';

const Seen = ({ data, onClick }) => {
    // console.log(data);
    let list;
    if (data === undefined) {
        list = "暂无数据";
    } else {
        list = data.map((e, index) => {
            return (
                <li key={index} onClick={(e) => {
                    e.defaultPrevented;
                    onClick(data[index])
                }}>
                    <img alt={e.Name}  className="notSeenImageUrl" src={e.Image_Url[0].Image_Url} />
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
export default Seen;