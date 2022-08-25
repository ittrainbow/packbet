import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import './Auth.module.scss';
import is from 'is_js';
import { connect } from 'react-redux';
import { auth, setCurrentUser } from '../../redux/actions/authActions';
import axios from '../../axios/axios';
import { findUser } from '../../frame/findUser';

class Auth extends Component {
  state = {
    isFormValid: false,

    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: ' ',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: ' ',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 5
        }
      },
    },
      
    tierline: '',
    authPage: true
  };

  componentDidMount() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    if (email && password) {
      const formControls = JSON.parse(JSON.stringify(this.state.formControls));
      formControls.email.value = email;
      formControls.password.value = password;
  
      this.setState({
        formControls,
        isFormValid: true
      });
    }
  }

  validation(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length > validation.minLength && isValid;
    }

    return isValid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validation(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls: formControls,
      isFormValid: isFormValid
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName];

        return (
          <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            onChange={(event) => this.onChangeHandler(event, controlName)}
          />
        );
      });
  };

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = async () => {
    const email = this.state.formControls.email.value;
    const password = this.state.formControls.password.value;   
    const name = this.state.formControls.name.value;
    
    const registeredUsers = await axios.get('pack/users.json');
    const userExists = findUser(registeredUsers.data, email).length;
    
    if (!userExists && this.state.isFormValid) {
      this.props.auth(email, password, false);
      await axios.post('pack/users.json', { email, name });
      const getBack = await axios.get('pack/users.json');
      this.props.setCurrentUser(Object.keys(getBack.data).slice(-1)[0], name);
    } else {
      this.setState({
        tierline: 'Используйте другой email'
      });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  authRegHandler() {
    const formControls = JSON.parse(JSON.stringify(this.state.formControls));

    if (!formControls.name) {
      formControls.name = {
        value: '',
        type: 'name',
        label: 'Username',
        errorMessage: ' ',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 2
        }
      };
    } else {
      delete (formControls.name);
    }

    this.setState({
      formControls: formControls,
      authPage: !this.state.authPage
    });
  }

  render() {
    return (
      <div className={classes.Auth}>
        <form 
          onSubmit={this.submitHandler} 
          className={classes.AuthForm}
        > 
          {this.renderInputs()}
          <div className={classes.tierline}>
            {this.state.tierline}
          </div>
          <div style={{marginBottom: '6px'}}>
            <Button 
              text={
                this.state.authPage
                  ? "Войти"
                  : "Регистрация"
              }
              type="success" 
              onClick={
                this.state.authPage
                  ? this.loginHandler
                  : this.registerHandler
              }
              // disabled={!this.state.isFormValid}
            /> 
          </div>
          <hr/>
          <div>
            <Button 
              text={
                this.state.authPage
                  ? "Перейти к регистрации"
                  : "Перейти к авторизации"
              }
              heightStyle='ButtonHeight'
              type="primary" 
              onClick={this.authRegHandler.bind(this)}
            />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userID: state.auth.userID
  };
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin, name) => dispatch(auth(email, password, isLogin, name)),
    setCurrentUser: (id, name) => dispatch(setCurrentUser(id, name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
