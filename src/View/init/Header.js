import React, { Component } from 'react';
import HaveSeen from '../content/HaveSeen.js';
import NotSeen from '../content/NotSeen.js';
import AddMoive from '../content/AddMoive.js';
import Login from '../content/Login.js';
import DetailMoive from '../content/DetailMoive.js';
import img from './images.js';
import '../css/Init.css'
import '../css/Computer.css';
class Header extends Component {
    constructor() {
        super();
        this.state = {
            showindex: 0,
            showLeft: false,
            login: false,
            onlogin: false,
            nava: [{
                name: "NotSeen Movies"
            }, {
                name: "HaveSeen Movies"
            }, {
                name: "Detail Moive"
            },],
            moivesDetail: {},
            notSeenList: [],
            haveSeenList: [],
        }
    }
    //初始化赋值 两个列表
    componentWillMount() {
        this.setState({
            haveSeenList: this.props.haveSeenData,
            notSeenList: this.props.notSeenData
        })
    }
    //添加数据后刷新界面
    refreshDataList() {
        fetch('http://localhost:3001/getHeanSeen?is_Delete=2').then(res => {
            return res.json();
        }).then(notSeenData => {
            fetch('http://localhost:3001/getHeanSeen?is_Delete=1').then(res => {
                res.json().then(data => {
                    this.setState({
                        haveSeenList: data,
                        notSeenList: notSeenData,
                        showindex: 0
                    })
                })
            })
        });
    }
    //显示详情
    showDetailMovie(number, data) {
        this.setState({ showindex: number, moivesDetail: data, showLeft: true });
    }
    //转换电影是否观看
    setDetailMovie() {
        fetch('http://localhost:3001/postSetMovie', {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.moivesDetail)
        }).then(res => {
            res.json().then(data => {
                if (data.code === '200') {
                    alert("转换成功");
                    // window.location.reload();
                    this.refreshDataList();
                } else {
                    alert("转换失败成功");
                }
            })
        });
    }
    //是否显示登录界面
    showLogin(flg) {
        var nava = this.state.nava, loshowindex = 4;
        if (flg === false) {
            nava.pop();
            loshowindex = 0;
        };
        this.setState({ login: flg, onlogin: false, nava: nava, showindex: loshowindex });
        localStorage.setItem("user", "");
    }
    //是否显示登录按钮
    showOnLogin() {
        var nava = this.state.nava;
        nava.push({
            name: "Add Movies"
        });
        this.setState({ onlogin: true, login: false, nava: nava, showindex: 0  });
    }
    //右下界面显示内容
    divAbsolute(data) {
        if (data === 'left') {
            this.setState({
                showindex: 0
            });
        } else if (data === 'Conversion') {
            this.setDetailMovie();
        } else if (data === 'top') {
            document.documentElement.scrollTop = 0
        }
    }

    render() {
        let nava = this.state.nava.map((e, index) => {
            if (index !== 2 || this.state.showLeft) {
                return (<a key={index} onClick={() => { this.setState({ showindex: index }) }} href={`#${e.name}`}>{e.name}</a>);
            } else {
                return (null);
            }
        });
        let Content = this.state.nava.map((e, index) => {
            if (index === 0 && index === this.state.showindex) {
                return (<NotSeen notSeenData={this.state.notSeenList} showDetailMovie={this.showDetailMovie.bind(this)} key={index} />);
            } else if (index === 1 && index === this.state.showindex) {
                return (<HaveSeen haveSeenData={this.state.haveSeenList} showDetailMovie={this.showDetailMovie.bind(this)} key={index} />);
            } else if (index === 2 && index === this.state.showindex) {
                return (<DetailMoive key={index} moivesDetail={this.state.moivesDetail} setDetailMovie={this.setDetailMovie.bind(this)} />);
            } else if (index === 3 && index === this.state.showindex) {
                return (<AddMoive key={index} refreshDataList={this.refreshDataList.bind(this)} />);
            } else {
                return (null);
            }
        });
        let onlogin = (<img alt="login" src={img.login} onClick={this.showLogin.bind(this, true)} />);
        if (this.state.onlogin) onlogin = (<img alt="out" src={img.out} onClick={this.showLogin.bind(this, false)} />);
        if (this.state.login & this.state.showindex === 4) Content = (<Login showOnLogin={this.showOnLogin.bind(this)} />);
        return (
            <div>
                <header>
                    <h1>GoodMovies</h1>
                    <nav>
                        {nava}
                    </nav>
                </header>
                <div className="content">
                    {Content}
                </div>
                <div className="divAbsolute">
                    <img alt="left" src={img.leftimg} className={this.state.showindex === 2 ? '' : 'displayNone'} onClick={this.divAbsolute.bind(this, 'left')} />
                    <img alt="top" src={img.topimg} onClick={this.divAbsolute.bind(this, 'top')} />
                    {onlogin}
                    <img alt="Conversion" src={img.Conversion} className={this.state.showindex === 2 ? '' : 'displayNone'} onClick={this.divAbsolute.bind(this, 'Conversion')} />
                    {this.state.notSeenList.total}°
                </div>
            </div>
        )
    }
}
export default Header;