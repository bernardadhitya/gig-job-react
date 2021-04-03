import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from '../../Containers/Home/Home';
import Login from '../../Containers/Login/Login';
import Playlist from '../../Containers/Playlist/Playlist';
import BusinessJobsPage from '../../Containers/BusinessJobsPage/BusinessJobsPage';

const BusinessOwnerNavigation = ({match}) => {
  return (
    <Switch>
      <PrivateRoute path={`${match.url}/pekerjaan`} component={BusinessJobsPage}/>
    </Switch>
  )
}

const HomeNavigation = () => {
  return (
    <Switch>
      <Route exact path='/'><Redirect to='/login'/></Route>
      <Route path='/login' component={Login}/>
      <Route path='/business' component={BusinessOwnerNavigation} />
    </Switch>
  );
};

//<PrivateRoute path='/home' component={Home}/>

export default HomeNavigation;