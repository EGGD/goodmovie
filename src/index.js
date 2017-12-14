import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './View/header/Header.js'
fetch('http://192.168.0.208:3001/getHeanSeen?is_Delete=2').then(res => {
    res.json().then(data => {
        ReactDOM.render(<Header haveSeenData={data} />, document.getElementById('root'));
    })
});


