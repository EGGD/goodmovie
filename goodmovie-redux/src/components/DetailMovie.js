import React, { Component } from 'react';
import '../plugin/commen.js';
import '../css/DetailMovie.css';

const DetailMovie = ({ data, onClick }) => {
    // console.log(data)
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
            <button onClick={e => {
                e.defaultPrevented;
                onClick(data);
            }}>转换</button>
        </div>
    )
}
export default DetailMovie;