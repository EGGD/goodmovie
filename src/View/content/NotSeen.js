import React, { Component } from 'react';
import '../css/NotSeen.css';
class NotSeen extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }
    getDate_Time(data){
        let initDate=new Date(data);
        return `${initDate.getFullYear()}-${initDate.getMonth()}-${initDate.getDay()}`
    }

    componentDidMount() {
        this.setState({
            list: this.props.haveSeenData
        })
    }

    render() {
        let list = this.state.list.map((e, index) => {
            return (
                <li key={index}>
                    {/* <label className="haveSeenID">{e.ID}</label> */}
                    <img alt={e.Name} className="notSeenImageUrl" src={e.imageUrl[0].ImageUrl} />
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