import React, { Component } from 'react';
import HaveSeen from '../content/HaveSeen.js';
import NotSeen from '../content/NotSeen.js';
import AddMoive from '../content/AddMoive.js';
import '../css/Init.css'
import '../css/Computer.css';
class Header extends Component {
    constructor() {
        super();
        this.state = {
            showindex: 0,
            nava: [{
                name: "NotSeen Movies"
            }, {
                name: "HaveSeen Movies"
            }, {
                name: "Add Movies"
            }],
        }
    }
    render() {
        let nava = this.state.nava.map((e, index) => {
            return (
                <a key={index} onClick={() => this.setState({ showindex: index })} href={`#${e.name}`}>{e.name}</a>
            )
        });
        let Content = this.state.nava.map((e, index) => {
            if (index === 0 && index === this.state.showindex) {
                return (<NotSeen haveSeenData={this.props.haveSeenData} key={index} />)
            } else if (index === 1 && index === this.state.showindex) {
                return (<HaveSeen key={index} />)
            } else if (index === 2 && index === this.state.showindex) {
                return (<AddMoive key={index} />)
            } else {
                return (null)
            }
        });
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

            </div>
        )
    }
}
export default Header;