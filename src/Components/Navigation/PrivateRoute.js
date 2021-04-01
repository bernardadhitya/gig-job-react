import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { fetchUser } from '../../Service';

const isLoggedIn = async () => {
  const user = await fetchUser();
  return !!user;
}

const renderAuthorizedComponent = (AuthorizedComponent, props) => {
  return (
    <div className='component-wrapper'>
      <AuthorizedComponent {...props}/>
    </div>
  );
};

const PrivateRoute = ({component: AuthorizedComponent, ...parentProps}) => {
  return (
    <Route
      {...parentProps}
      render={(props) => (
        isLoggedIn()
          ? (
            <>
              {renderAuthorizedComponent(AuthorizedComponent, props)}
            </>
          )
          : <Redirect to='/login'/>
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any
};

export default PrivateRoute;