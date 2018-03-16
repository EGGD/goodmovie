//右侧悬浮栏内容
import { connect } from 'react-redux';
import RightFloat from '../components/RightFloat';
import { showNavFlgChange, headerChange, outLogin, setDetail } from '../actions';
import history from '../init/history';

const mapStateToProps = (state) => ({
    active: state,
})
const mapDispatchToProps = (dispatch) => ({
    //点击显示登录界面
    onClick: (value) => {
        if (value) {
            history.push("/Login");
        } else {
            dispatch(outLogin({}))
        };
    },
    //点击显示详情转换
    onSetClick: (value) => {
        dispatch(setDetail(value))
    }
})
const RightFloatList = connect(
    mapStateToProps,
    mapDispatchToProps
)(RightFloat)
export default RightFloatList;