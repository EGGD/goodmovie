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
/*
  name 标签页名称
  showNavFlg 标签页是否显示可选
  showDataFlg 标签页内容是否显示
*/

// 多模块数据展示
// 先再header添加点击效果
// 然后再actions里面添加修改显示的内容 
// 显示内容的部分 读取显示的内容 要在reduces里面声明变量

//导航切换
export const changeFilters = (name) => ({
  type: 'CHANGE_FILTERS',
  name
})
//更改是否显示电影详情分栏
export const changeHeaderFilters = (name) => ({
  type: 'CHANGE_HEADER_FILTERS',
  name
})
//获取当前选中页的列表数量
export const getModulesTotal = (name) => ({
  type: 'GET_MODULES_TOTAL',
  name
})
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
//定义显示的内容
export const SELECT_MOVIES = 'SELECT_MOVIES';
export function selectMovies(subreddit) {
  return {
    type: SELECT_MOVIES,
    subreddit
  }
}
//更新显示内容
export const INVALIDATE_MOVIES = 'INVALIDATE_MOVIES';
export function invalidateMovies(subreddit) {
  return {
    type: SELECT_MOVIES,
    subreddit
  }
}
//静态默认数据
export const MOVIESREQUEST_POST = 'MOVIESREQUEST_POST';
export function moviesRequestPost(subreddit) {
  return {
    type: MOVIESREQUEST_POST,
    subreddit,
  }
}
//接口请求响应 修改了当type为MOVIESRECEIVE_MOVIES的数据 
//然后会改变响应reducers里面的条件判断
export const MOVIESRECEIVE_MOVIES = 'MOVIESRECEIVE_MOVIES';
export function moviesReceivePosts(subreddit, notSeenData, haveSeenData) {
  return {
    type: MOVIESRECEIVE_MOVIES,
    subreddit,
    notSeenData: notSeenData.data,
    haveSeenData: haveSeenData.data,
    receivedAt: Date.now(),
    total: notSeenData.data
  }
}
//请求接口
export function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(moviesRequestPost(subreddit))
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
//填充显示详情的数据
export const MOVIES_DETAIL = 'MOVIES_DETAIL';
export function moviesDetail(detail) {
  return {
    type: MOVIES_DETAIL,
    detail,
  }
}
//更改电影的类型 未看和一看之间改变
export function setDetail(value, dispatch) {
  fetch(`${webApi}postSetMovie`, { ...fetchHeader, body: JSON.stringify(value) }).then(res => {
    res.json().then(data => {
      if (data.code === '200') {
        alert("转换成功");
        //重新获取列表数据
        dispatch(fetchPosts('reactjs'));
        //将内容显示在NotSeen_Movies栏
        dispatch(changeFilters('NotSeen_Movies'));
      } else {
        alert("转换失败成功");
      }
    })
  });
}
export const LOGIN_DETAIL = 'LOGIN_DETAIL';
export const setLogin = (detail) => ({
  type: LOGIN_DETAIL,
  detail
})
export function Login() {

}