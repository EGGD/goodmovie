import React,{Component} from 'react';
import '../css/Init.css'
import '../css/Computer.css';
class Header extends Component{
    constructor(){
        super();
        this.state={
            show:'HaveSeen',
        }
    }
    render(){
        let HeaderText='sss';
        return(
            <div>
                <header>
                    <h1 href="#">GoodMovies</h1>
                    <nav>
                        <a href="#HaveSeen">HaveSeen Movies</a>
                        <a href="#NotSeen">NotSeen Movies</a>
                        <a href="#Add">Add Movies</a>
                    </nav>
                </header>
                <div>
                    {HeaderText}
                </div>
            </div>
        )
    }
}
export default Header;