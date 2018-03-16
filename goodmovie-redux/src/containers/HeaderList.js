import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeFilters, getModulesTotal } from '../actions';

const getHeaderNavFlg = (value) => {
  return value.filter((value) => value.showNavFlg)
}

const mapStateToProps = (state) => ({
  active: getHeaderNavFlg(state.headerFilter)
})


const mapDispatchToProps = (dispatch) => ({
  onClick: (value) => {
    dispatch(changeFilters(value.name));
    dispatch(getModulesTotal(value.name));
    // console.log(value)
  }
})

const HeaderList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderList;
