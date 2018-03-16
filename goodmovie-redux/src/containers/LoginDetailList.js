import { connect } from 'react-redux';
import LoginDetail from '../components/LoginDetail';
import { Login } from '../actions';

const mapStateToProps = (state) => ({
    active: state,
})
const mapDispatchToProps = (dispatch) => ({
    onClick: (value) => {
        // dispatch(Login({
        //     name:'1'
        // }))
    }
})
const LoginDetailList = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginDetail)
export default LoginDetailList;