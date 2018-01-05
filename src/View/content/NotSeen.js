import React, { Component } from 'react';
import '../init/commen.js';
import '../css/NotSeen.css';
class NotSeen extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount() {
        this.setState({
            list: this.props.notSeenData
        })
    }
    onshoWDetailMovie(data) {
        this.props.showDetailMovie(2, data);
    }
    render() {
        let list;
        if (this.state.list.length === 0 || this.state.list.length === undefined) {
            list = "暂无数据";
        } else {
            list = this.state.list.map((e, index) => {
                return (
                    <li key={index} onClick={this.onshoWDetailMovie.bind(this, e)}>
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
export default NotSeen;