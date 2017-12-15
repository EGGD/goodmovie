import React, { Component } from 'react';
class DetailMoive extends Component {
    // constructor() {
    //     super();
    // }
    render() {
        let data=this.props.moivesDetail;
        return (
            <div>
                <img alt="暂无图片" src={data.Image_Url[0].Image_Url}/>
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
                    时间：{data.Date_Time}
                </p>
                <p>
                    下载地址：{data.Download[0].Sownload_Url}
                </p>
            </div>

        )
    }
}
export default DetailMoive;