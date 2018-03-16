import { connect } from 'react-redux';
import Header from '../components/Header';
import { headerChange, Login, movieDetail, showNavFlgChange } from '../actions';
import history from '../init/history';

const getHeaderList = (value) => {
  return value.filter((value) => value.showNavFlg);
}

const mapStateToProps = (state) => ({
  active: getHeaderList(state.showHeaderFilter),
  data: state.getData
})


const mapDispatchToProps = (dispatch, state) => ({
  onClick: (value, active) => {
    if (value === 'NotSeen_Movies') {
      dispatch(headerChange('notSeenData'))
    } else if (value === 'HaveSeen_Movies') {
      dispatch(headerChange('haveSeenData'))
    } else if (value === 'Detail_Movies') {
      dispatch(headerChange('detailMovie'))
    }
  },
  onSetDetail: (value) => {
    dispatch(movieDetail(value));
    dispatch(showNavFlgChange('Detail_Movies', true));
    history.push('/Detail_Movies');
  }
})

const HeaderList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderList;
