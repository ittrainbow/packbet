import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import classes from './Userpage.module.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { logout } from '../../redux/actions/authActions';
import { connect } from 'react-redux/es/exports';

class Userpage extends Component {
  state = {
    showPassword: false
  };

  passwordHandler() {
    const password = localStorage.getItem('password');
    const stars = '*'.repeat(password.length);

    return this.state.showPassword
      ? password
      : stars;
  }

  stateHandler() {
    this.setState({
      showPassword: !this.state.showPassword
    });
  }

  logoutHandler() {
    this.props.logout();
  }

  render() {
    return (
      <div className={classes.Userpage}>
        <div style={{marginBottom: '20px'}}>
          Имя: { this.props.userName }
        </div>        
        <div style={{marginBottom: '20px'}}>
          Пароль: <i className='fa fa-eye' onClick={() => this.stateHandler()} style={{cursor: 'pointer'}}/>
          {' '}
          { this.passwordHandler() }
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
