import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import './Auth.module.scss';
import axios from 'axios';
import is from 'is_js';

class Auth extends Component {
  state = {
    isFormValid: false,

    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Email is incorrect',
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
        errorMessage: 'Введите пароль > 6 символов',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

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
    // console.log(controlName, event.target.value);

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

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9NU-wQT1k3sXgIyGMbKbfO8_Z-g7JlKU',
        authData);

        console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9NU-wQT1k3sXgIyGMbKbfO8_Z-g7JlKU',
        authData);

        console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <form 
          onSubmit={this.submitHandler} 
          className={classes.AuthForm}
        >
          {this.renderInputs()}
          <div>
            <Button 
              text="Войти"
              type="success" 
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            /> 
          </div>
          <div>
            <Button 
              text="Регистрация"
              type="primary" 
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Auth;
