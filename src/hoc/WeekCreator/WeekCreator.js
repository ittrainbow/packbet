import React, { Component } from 'react';
import classes from './WeekCreator.module.scss';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Auxiliary from '../../frame/Auxlilary'; // для возврата children
import { createControl, validate, validateForm } from '../../frame/formFramework';
import Select from '../../components/Select/Select';
import axios from '../../axios/axios';

function createTotal(index) {
  return createControl({
    label: `Var ${index}`,
    errorMessage: 'Error',
    id: index
  }, {required: true});
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Add Q',
      errorMessage: 'Q is empty',
    }, {required: true}),
    total: createTotal(),
  };
}

class WeekCreator extends Component {

  state = {
    quiz: [],
    isFormValid: false,
    formControls: createFormControls(),
    rightAnswerId: 1
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;
    const {question, option1, option2, option3, option4} = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},        
        {text: option2.value, id: option2.id},        
        {text: option3.value, id: option3.id},        
        {text: option4.value, id: option4.id}
      ]
    };

    quiz.push(questionItem);

    this.setState({
      quiz: quiz,
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1
    });
  };

  createWeekHandler = async (event) => {
    event.preventDefault();

    try {
      await axios.post('pack.json', this.state.quiz);

      this.setState({
        quiz: [],
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
      });
    } catch (e) {
      console.log(e);
    }
  };
  
  changeHandler = (value, controlName) => {    
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls: formControls,
      isFormValid: validateForm(formControls)
    });
  };
  
  selectChangeHandler = (event) => {
    console.log(event.target.value);
    this.setState({
      rightAnswerId: +event.target.value
    });
  };


  renderControls() {
    return Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName];
        
        return (
          <Auxiliary key={controlName + index}>
            <Input 
              label={control.label}
              value={control.value}
              total={control.total}
              valid={control.valid}
              shouldValidate={!!control.validation}
              touched={control.touched}
              errorMessage={control.errorMessage}
              onChange={(event) => this.changeHandler(event.target.value, controlName)}
            />
          </Auxiliary>
        );
      }      
    );
  }

  render() {
    return (
      <div className={classes.WeekCreator}>
        <div>
          <h3>Создание недели</h3>

          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add Q?
            </Button>
            <Button
              type="success"
              onClick={this.createWeekHandler}
              disabled={this.state.quiz.length === 0}
            >
              Create week
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default WeekCreator;
