import '../css/Init.css'
import '../css/Computer.css';
import React from 'react';
// import { HeaderFilters } from '../actions';
// import { HeaderList } from '../containers/HeaderList';

const Header = ({ active, onClick }) => {
    // console.log(active)
    let headerlist = active.map((value, key) => {
        // if (value!=null) {
            return (
                <a key={key} onClick={e => {
                    e.preventDefault();
                    onClick(value)
                }}>
                    {value.name}
                </a>
            )
        // }

    })
    return (
        <header>
            <h1>GoodMovies</h1>
            <nav>
                {headerlist}
            </nav>
        </header>
    )
}
export default Header;
