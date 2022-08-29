import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';

const PrivateRoute = (props) => {
  return (
    props.isLoggedIn
      ? <Outlet />
      : <Navigate to='/profile' />
  );
};

function mapStateToProps(state) {
  return {
    isLoggedIn: !!state.auth.token
  };
}

export default connect(mapStateToProps, null)(PrivateRoute);