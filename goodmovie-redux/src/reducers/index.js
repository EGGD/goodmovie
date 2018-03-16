import { combineReducers } from 'redux';
import headerFilter from './headerFilter';
import showModulesFilter from './showModulesFilter';
import loginDetailFilter from './loginDetailFilter';

const reducerList = combineReducers({
  headerFilter,
  showModulesFilter,
  loginDetailFilter,
})
export default reducerList