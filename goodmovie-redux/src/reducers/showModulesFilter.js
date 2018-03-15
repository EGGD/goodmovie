import { combineReducers } from 'redux';
import {
  MOVIESRECEIVE_MOVIES,
  MOVIES_DETAIL
} from '../actions';
//根据reduvceers里面的多 type 查找到 type 为MOVIESRECEIVE_MOVIES的值
//这边的action是指向type条件满足的 this 本身
//这边的action的值就可以这样算  这里是遍历store里面的数据  
//然后查到action.type满足的action来给之后的rerun来赋值？
const showModulesFilter = (state = {
  detail: {},
}, action) => {
  switch (action.type) {
    case MOVIESRECEIVE_MOVIES:
      return {
        ...state,
        notSeenData: action.notSeenData,
        haveSeenData: action.haveSeenData,
        lastUpdated: action.receivedAt,
        total: action.notSeenData.length
      }
    case MOVIES_DETAIL:
      return {
        ...state,
        detail: action.detail,
      }
    case 'GET_MODULES_TOTAL':
      if (action.name === 'NotSeen_Movies') {
        return { ...state, total: state.notSeenData.length }
      } else if (action.name === 'HaveSeen_Movies') {
        return { ...state, total: state.haveSeenData.length }
      } else {
        return { ...state, total: "" }
      }
    default:
      return state
  }
}

export default showModulesFilter