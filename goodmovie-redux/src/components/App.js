import React from 'react';
import Header from './Header';
import HeaderList from '../containers/HeaderList'
import ShowModulesList from '../containers/ShowModulesList'
import LoginDetailList from '../containers/LoginDetailList'


const App = () => (
  <div>
    <HeaderList />
    <ShowModulesList/>
    <LoginDetailList/>
  </div>
)
export default App;