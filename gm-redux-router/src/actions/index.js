import { createAction } from 'redux-actions';
import history from '../init/history';
const webApi = 'http://localhost:3001/';
const fetchHeader = {
  method: "POST",
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: ""
};
export const HeaderFilters = [
  //显示的模块内容 
  {
    name: "NotSeen_Movies",
    showNavFlg: true,
    showDataFlg: true,
  }, {
    name: "HaveSeen_Movies",
    showNavFlg: true,
    showDataFlg: false,
  }, {
    name: 'Detail_Movies',
    showNavFlg: false,
    showDataFlg: false,
  }, {
    name: 'Login',
    showNavFlg: false,
    showDataFlg: false,
  }, {
    name: 'Add_Movies',
    showNavFlg: false,
    showDataFlg: false,
  },
]
export const init = createAction("INIT");
export function setDetail(value) {
  return dispatch => {
    fetch(`${webApi}postSetMovie`, { ...fetchHeader, body: JSON.stringify(value) }).then(res => {
      res.json().then(data => {
        if (data.code === '200') {
          alert("转换成功");
          //重新获取列表数据
          dispatch(fetchPosts('reactjs'));
          dispatch(showNavFlgChange('Detail_Movies', false));
          history.push('/NotSeen_Movies');
        } else {
          alert("转换失败成功");
        }
      })
    });
  }
}
//改变显示的分栏内容
export const showNavFlgChange = createAction("SHOWNAVFLG_CHANGE", (name, value) => ({ name, value }));
//改变显示的分栏内容
export const headerChange = createAction("HEADER_CHANGE");
//点击数据传值
export const movieDetail = createAction("MOVIE_DETAIL");
//列表数据赋值
export const moviesReceivePosts = createAction("MOVIESRECEIVE_MOVIES",
  (subreddit, notSeenData, haveSeenData) => (
    { subreddit, notSeenData, haveSeenData }
  ));
//请求电影列表数据
export function fetchPosts(subreddit) {
  return dispatch => {
    // dispatch(moviesRequestPost())
    return fetch(`${webApi}getHeanSeen?is_Delete=1`)
      .then(response => response.json())
      .then(notSeenData => {
        fetch(`${webApi}getHeanSeen?is_Delete=2`).then(res => {
          res.json().then(haveSeenData => {
            dispatch(moviesReceivePosts(subreddit, notSeenData, haveSeenData))
          })
        })
      })
  }
}
//登录后返回的参数赋值
export const loginDetail = createAction("LOGIN_DETAIL", detail => detail);
//退出登录
export const outLogin = createAction("OUT_LOGIN", detail => detail);
//登录
export function onLogin(value) {
  return dispatch => {
    fetch(`${webApi}postUser`, { ...fetchHeader, body: JSON.stringify(value) }).then(res => {
      res.json().then(data => {
        if (data.code === '200' && data.msg !== undefined) {
          alert("登录成功");
          dispatch(loginDetail(data));
          history.push('/NotSeen_Movies');
        } else {
          alert("账号或密码不正确")
        }
      })
    });
  }
}