import React, { Component } from 'react';
import '../css/HaveSeen.css';
class HaveSeen extends Component {
    constructor() {
        super();
        this.state = {
            list: [{
                ID: "0",
                Name: "圣诞王子HD1280",
                ImageUrl: "http://img.piaowu99.com/0701pic/allimg/17/4_12131334041530.jpg",
                Decsription: "0",
                Date_Time: '2017-12-13',
            }, {
                ID: "1",
                Name: "1号电影",
                ImageUrl: "http://img.piaowu99.com/0701pic/17/4-1G21220261X12.jpg",
                Decsription: "1",
                Date_Time: new Date().getDate(),
            }, {
                ID: "2",
                Name: "2号电影",
                ImageUrl: "http://img.piaowu99.com/0701pic/17/4-1G213094153917.jpg",
                Decsription: "2",
                Date_Time: new Date().getDate(),
            }, {
                ID: "3",
                Name: "3号电影",
                ImageUrl: "http://img.piaowu99.com/0701pic/allimg/17/4_12121422046092.jpg",
                Decsription: "3",
                Date_Time: new Date().getDate(),
            }]
        }
    }
    render() {
        let list = this.state.list.map((e, index) => {
            return (
                <li key={index}>
                    {/* <label className="haveSeenID">{e.ID}</label> */}
                    <img alt={e.Name} className="haveSeenImageUrl" src={e.ImageUrl} />
                    <p className="haveSeenName">{e.Name}</p>
                    <p className="haveSeenDateTime">{e.Date_Time}</p>
                </li>
            )
        })
        return (
            <ul className="haveSeenUl">
                {list}
            </ul>
        )
    }
}
export default HaveSeen;