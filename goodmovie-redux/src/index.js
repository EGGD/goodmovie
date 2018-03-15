import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './components/App';
import { fetchPosts } from './actions';
// localStorage.clear();
// const loggerMiddleware = createLogger();
const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);
//第一次请求数据
store.dispatch(fetchPosts('reactjs'))
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);


