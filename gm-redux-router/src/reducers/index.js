import { combineReducers } from 'redux';
import showHeaderFilter from './showHeaderFilter';
import getData from './getData';
import LoginFilter from './LoginFilter';

const reducerList = combineReducers({
  showHeaderFilter,
  getData,
  LoginFilter
})
export default reducerList