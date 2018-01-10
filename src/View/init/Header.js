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
            }, {
                name: "Add Movies"
            },],
            moivesDetail: {},
            notSeenList: [],
            haveSeenList: [],
        }
    }
    componentWillMount() {
        this.setState({
            haveSeenList: this.props.haveSeenData,
            notSeenList: this.props.notSeenData
        })
    }
    showDetailMovie(number, data) {
        this.setState({ showindex: number, moivesDetail: data, showLeft: true });
    }
    showLogin(flg) {
        this.setState({ login: flg, onlogin: false });
        localStorage.setItem("user","");
    }
    showOnLogin() {
        this.setState({ onlogin: true, login: false });
    }
    divAbsolute(data) {
        if (data === 'left') {
            this.setState({
                showindex: 0
            });

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
                return (<DetailMoive key={index} moivesDetail={this.state.moivesDetail} />);
            } else if (index === 3 && index === this.state.showindex) {
                return (<AddMoive key={index} />);
            } else {
                return (null);
            }
        });
        let onlogin = (<img alt="login" src={img.login} onClick={this.showLogin.bind(this, true)} />);
        if (this.state.onlogin) onlogin = (<img alt="out" src={img.out} onClick={this.showLogin.bind(this, false)} />);
        if (this.state.login) Content = (<Login showOnLogin={this.showOnLogin.bind(this)} />);
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
                    {onlogin}
                    <img alt="left" src={img.leftimg} className={this.state.showindex === 2 ? '' : 'displayNone'} onClick={this.divAbsolute.bind(this, 'left')} />
                    <img alt="top" src={img.topimg} onClick={this.divAbsolute.bind(this, 'top')} />
                    {this.state.notSeenList.total}°
                </div>
            </div>
        )
    }
}
export default Header;