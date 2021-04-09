import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../../Containers/Login/Login';
import BusinessJobsPage from '../../Containers/BusinessJobsPage/BusinessJobsPage';
import BusinessOrdersPage from '../../Containers/BusinessOrdersPage/BusinessOrdersPage';

const DummyPage = () => {
  return (
    <h1>This is a dummy page</h1>
  )
}

const BusinessOwnerNavigation = ({match}) => {
  return (
    <Switch>
      <PrivateRoute exact path={match.url} component={BusinessJobsPage}/>
      <PrivateRoute path={`${match.url}/pesanan`} component={BusinessOrdersPage}/>
      <PrivateRoute path={`${match.url}/chat`} component={DummyPage}/>
      <PrivateRoute path={`${match.url}/profil`} component={DummyPage}/>
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

export default HomeNavigation;