import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './Auth.module.scss';

class Auth extends Component {
  state = {
    isFormValid: false,

    formControls: {
      username: {
        value: '',
        type: 'username',
        label: 'Username',
        errorMessage: "Введите @username",
        valid: false,
        touched: false,
        validation: {
          required: true,
          username: true
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

    if (validation.username) {
      isValid = value.trim().length > 0 
        && value.length === value.trim().length 
        && value.substring(0, 1) === '@';
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

  loginHandler = () => {
    
  };

  registerHandler = () => {
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <div className={classes.AuthHeader}>          
            <h3>Auth</h3>
          </div>
          <form 
            onSubmit={this.submitHandler} 
            className={classes.AuthForm}
          >
            {this.renderInputs()}
            <div>
              <Button 
                type="success" 
                onClick={this.loginHandler}
                disabled={!this.state.isFormValid}
              >
                Войти
              </Button>  
            </div>
            <div>
              <Button 
                type="primary" 
                onClick={this.registerHandler}
                disabled={!this.state.isFormValid}
              >
                Регистрация
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
