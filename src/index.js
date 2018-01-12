import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './View/init/Header.js';
import api from './View/init/api.js';
localStorage.clear();
fetch(api.webApi+'getHeanSeen?is_Delete=2').then(res => {
    return res.json();
}).then(notSeenData => {
    fetch(api.webApi+'getHeanSeen?is_Delete=1').then(res => {
        res.json().then(data => {
            ReactDOM.render(<Header haveSeenData={data} notSeenData={notSeenData} />, document.getElementById('root'));
        })
    })
});


