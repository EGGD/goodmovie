const loginDetailFilter = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_DETAIL':
            return action.detail;
        default:
            return state;
    }
}
export default loginDetailFilter;