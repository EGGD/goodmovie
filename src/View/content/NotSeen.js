import React, { Component } from 'react';
import '../css/NotSeen.css';
class NotSeen extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    getDate_Time(data) {
        let initDate = new Date(data);
        return `${initDate.getFullYear()}-${initDate.getMonth() + 1}-${initDate.getDate()}`
    }
    componentDidMount() {
        this.setState({
            list: this.props.haveSeenData
        })
    }
    onshoWDetailMovie(data) {
        this.props.showDetailMovie(2, data);
    }
    render() {
        let list = this.state.list.map((e, index) => {
            return (
                <li key={index} onClick={this.onshoWDetailMovie.bind(this, e)}>
                    {/* <li key={index} onClick={this.props.showDetailMovie(3,e)}> */}
                    <img alt={e.Name} className="notSeenImageUrl" src={e.Image_Url[0].Image_Url} />
                    <p className="notSeenName">{e.Name}</p>
                    <p className="notSeenDateTime">{this.getDate_Time(e.Date_Time)}</p>
                </li>
            )
        })
        return (
            <ul className="notSeenUl">
                {list}
            </ul>
        )
    }
}
export default NotSeen;