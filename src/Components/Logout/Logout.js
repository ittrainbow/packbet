import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout);