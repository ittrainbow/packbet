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
        <div style={{marginBottom: '20px'}}>
          { !!this.props.userName
              ? this.props.userName
              : localStorage.getItem('userName')
          }
        </div>
        <div>
          <Button 
            text='Logout'
            onClick={this.logoutHandler.bind(this)}
          />
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    userName: state.auth.userName
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Userpage);
