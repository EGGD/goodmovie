import { handleActions } from 'redux-actions';
const LoginFilter = handleActions({
  LOGIN_DETAIL(state, action) {
    let detail = action.payload;
    return detail.msg
  },
  OUT_LOGIN(state, action) {
    let detail = action.payload;
    return ({})
  }
}, {})
export default LoginFilter;