//右侧悬浮栏内容
import React, { Component } from 'react';
import img from '../init/images'
import history from '../init/history';

class RightFloat extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        let active = this.props.active;
        let showLogin = JSON.stringify(active.LoginFilter) === '{}'  ? true : false;
        return (
            <div className="divAbsolute" >
                <img alt="top" src={img.topimg}/>
                <img alt="login"
                    src={JSON.stringify(active.LoginFilter) === '{}' ? img.login : img.out}
                    onClick={e => {
                        e.defaultPrevented;
                        this.props.onClick(showLogin);
                    }} />
                <img alt="Conversion" src={img.Conversion}
                    className={active.getData.showName === 'detailMovie' ? '' : 'displayNone'}
                    onClick={e => {
                        e.defaultPrevented;
                        this.props.onSetClick(active.getData.movieDetail)
                    }} />
                {active.getData.total}
            </div>
        )
    }
}
export default RightFloat;

