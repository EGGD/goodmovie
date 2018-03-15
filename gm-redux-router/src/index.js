import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './containers/App';
import { fetchPosts } from './actions';
import { Router } from 'react-router-dom';
import history from './init/history';
const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
    )
);


//第一次请求数据
store.dispatch(fetchPosts('reactjs'));
history.push('/NotSeen_Movies');
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);


