import React, { Component } from 'react';
import { connect } from 'react-redux/es/exports';
import Auth from '../Components/Auth/Auth';
import Userpage from '../Components/Userpage/Userpage';
import classes from './Pages.module.scss';

class Profile extends Component {

  render() {
    return (
      <div className={classes.Container}>
        <h3>Авторизация</h3>
        {
          this.props.isAuthenticated
            ? <Userpage />
            : <Auth />
        }
  
      </div>
    );
  }

};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token
  };
}

export default connect(mapStateToProps, null)(Profile);