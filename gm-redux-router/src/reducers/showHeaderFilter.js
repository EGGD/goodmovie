import { handleActions } from 'redux-actions';
import { HeaderFilters } from '../actions';
const showHeaderFilter = handleActions({
  INIT(state, action) {
    return ({
      ...state,
      HeaderFilters
    })
  },
  SHOWNAVFLG_CHANGE(state = HeaderFilters, action) {
    let name = action.payload.name;
    let setValue = action.payload.value;
    return HeaderFilters.map(value =>
      (value.name === name)
        ? { ...value, showNavFlg: setValue }
        : { ...value }
    )
  }
}, HeaderFilters)
export default showHeaderFilter;