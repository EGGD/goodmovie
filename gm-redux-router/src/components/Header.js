//导航栏内容
import '../css/Init.css'
import '../css/Computer.css';
import React, { Component } from 'react';
import Seen from './Seen';
import DetailMovie from './DetailMovie';
import Login from './Login';
import {
    Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import history from '../init/history';


class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let active = this.props.active;
        let data = this.props.data;
        let headerlist = active.map((value, key) => {
            return (
                <Link to={`/${value.name}`} onClick={(e) => {
                    e.defaultPrevented;
                    this.props.onClick(value.name)
                }} key={key}>{value.name}</Link>
            )
        })
        return (
            <Router history={history}>
                <div>
                    <header>
                        <h1>GoodMovies</h1>
                        <nav>
                            <div>
                                <ul>
                                    {headerlist}
                                </ul>
                            </div>
                        </nav>
                    </header>
                    <ul className="content">
                        <Switch>
                            <Route exact path="/NotSeen_Movies" component={() => <Seen data={data.notSeenData} onClick={this.props.onSetDetail} />} />
                            <Route path="/HaveSeen_Movies" component={() => <Seen data={data.haveSeenData} onClick={this.props.onSetDetail} />} />
                            <Route path="/Detail_Movies" component={() => <DetailMovie data={data.movieDetail} />} />
                            <Route path="/Login" component={Login} />
                        </Switch>
                    </ul>
                </div>
            </Router>
        )
    }
}
export default Header;
