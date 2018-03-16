import { HeaderFilters } from '../actions'
const headerFilter = (state = HeaderFilters, action) => {
  switch (action.type) {
    case 'CHANGE_FILTERS':
      return state.map(value =>
        (value.name === action.name)
          ? { ...value, showDataFlg: true }
          : { ...value, showDataFlg: false }
      )
    case 'CHANGE_HEADER_FILTERS':
      return state.map(value =>
        (value.name === 'Detail_Movies')
          ? { ...value, showNavFlg: true }
          : { ...value }
      )
    default:
      return state;
  }
}
export default headerFilter