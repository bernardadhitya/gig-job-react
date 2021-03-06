import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../../Containers/Login/Login';
import BusinessJobsPage from '../../Containers/BusinessJobsPage/BusinessJobsPage';
import BusinessOrdersPage from '../../Containers/BusinessOrdersPage/BusinessOrdersPage';
import BusinessJobDetailPage from '../../Containers/BusinessJobDetailPage/BusinessJobDetailPage';
import BusinessJobPosterProfilePage from '../../Containers/BusinessJobPosterProfilePage/BusinessJobPosterProfilePage';
import ServiceJobsPage from '../../Containers/ServiceJobsPage/ServiceJobsPage';
import ServiceCreateJobPage from '../../Containers/ServiceCreateJobPage/ServiceCreateJobPage';
import ProfileSettingPage from '../../Containers/ProfileSettingPage/ProfileSettingPage';
import BusinessWishlistPage from '../../Containers/BusinessWishlishPage/BusinessWishlistPage';
import ServiceJobDetailPage from '../../Containers/ServiceJobDetailPage/ServiceJobDetailPage';

const BusinessOwnerNavigation = ({match}) => {
  return (
    <Switch>
      <PrivateRoute exact path={match.url} component={BusinessJobsPage}/>
      <PrivateRoute path={`${match.url}/pesanan`} component={BusinessOrdersPage}/>
      <PrivateRoute exact path={`${match.url}/profil/:id`} component={BusinessJobPosterProfilePage}/>
      <PrivateRoute path={`${match.url}/profil`} component={ProfileSettingPage}/>
      <PrivateRoute path={`${match.url}/wishlist`} component={BusinessWishlistPage}/>
      <PrivateRoute path={`${match.url}/:id`} component={BusinessJobDetailPage}/>
    </Switch>
  )
}

const ServiceProviderNavigation = ({match}) => {
  return (
    <Switch>
      <PrivateRoute exact path={match.url} component={ServiceJobsPage}/>
      <PrivateRoute path={`${match.url}/pekerjaan`} component={ServiceCreateJobPage}/>
      <PrivateRoute path={`${match.url}/pesanan`} component={BusinessOrdersPage}/>
      <PrivateRoute exact path={`${match.url}/profil/:id`} component={BusinessJobPosterProfilePage}/>
      <PrivateRoute path={`${match.url}/profil`} component={ProfileSettingPage}/>
      <PrivateRoute path={`${match.url}/:id`} component={ServiceJobDetailPage}/>
    </Switch>
  )
}

const HomeNavigation = () => {
  return (
    <Switch>
      <Route exact path='/'><Redirect to='/login'/></Route>
      <Route path='/login' component={Login}/>
      <Route path='/business' component={BusinessOwnerNavigation}/>
      <Route path='/service' component={ServiceProviderNavigation}/>
    </Switch>
  );
};

export default HomeNavigation;