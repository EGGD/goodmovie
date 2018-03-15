import { connect } from 'react-redux';
import { changeFilters, changeHeaderFilters, moviesDetail, getModulesTotal, setDetail } from '../actions';
import Modules from '../components/Modules';


const mapStateToProps = (state) => ({
  active: state,
})


const mapDispatchToProps = (dispatch) => ({
  onClick: (value) => {
    //导航切换
    dispatch(changeFilters('Detail_Movies'))
    //显示Detail_Movies分栏
    dispatch(changeHeaderFilters('Detail_Movies'))
    //传递详情页内容
    dispatch(moviesDetail(value))
    //列表数据显示
    dispatch(getModulesTotal(value.name));
  },
  onsetClick: (value) => {
    setDetail(value, dispatch)
  }
})

const ShowModules = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modules)

export default ShowModules;
