import { handleActions } from 'redux-actions';
import { moviesReceivePosts } from '../actions';

const getData = handleActions({
  MOVIESRECEIVE_MOVIES(state, action) {
    let allData = action.payload;
    return ({
      ...state,
      notSeenData: allData.notSeenData.data,
      haveSeenData: allData.haveSeenData.data,
      showSeenData: allData.notSeenData.data,
      movieDetail:{},
      showName: "notSeenData",
      total: allData.notSeenData.total
    })
  },
  HEADER_CHANGE(state, action) {
    let allData = action.payload;
    return allData === 'detailMovie'
      ? ({ ...state, showName: allData, total: 0 })
      : ({ ...state, showSeenData: state[allData], showName: allData, total: state[allData].length })
  },
  MOVIE_DETAIL(state, action) {
    let detail = action.payload;
    return ({
      ...state,
      movieDetail: detail,
      showName: "detailMovie",
      total: 0
    })
  }
}, moviesReceivePosts)
export default getData;