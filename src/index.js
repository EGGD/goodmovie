import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './View/header/Header.js'
fetch('http://localhost:3001/getHeanSeen?is_Delete=2').then(res => {
    res.json().then(data => {
        ReactDOM.render(<Header haveSeenData={data} />, document.getElementById('root'));
    })
});


