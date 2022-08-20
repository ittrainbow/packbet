import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import classes from './Userpage.module.scss';
import { logout } from '../../redux/actions/authActions';
import { connect } from 'react-redux/es/exports';

class Userpage extends Component {
  logoutHandler() {
    this.props.logout();
  }

  render() {
    return (
      <div className={classes.Userpage}>
        <Button 
          text='Logout'
          onClick={this.logoutHandler.bind(this)}
        />
      </div>
    );
  };
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(null, mapDispatchToProps)(Userpage);
