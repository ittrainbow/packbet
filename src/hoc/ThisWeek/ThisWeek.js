import React, {Component} from 'react';
import classes from './ThisWeek.module.scss';
import Questions from '../../components/Questions/Questions';
import Button from '../../components/Button/Button';
import * as weeks from '../../db';

const tasks = weeks.week01.tasks;

const id = window.location.pathname.split('/').slice(-1).toString();

let createButtons = {};

for (let i=0; i<tasks.length; i++) {
  createButtons[`${i}:${0}`] = false;
  createButtons[`${i}:${1}`] = false;
}

class ThisWeek extends Component {
  state = {
    week: weeks.week01.number,
    name: weeks.week01.name, 
    questions: tasks,
    allButtons: createButtons
  };

  invertor(selector) {
    return selector[2] === '1' ? selector[0] + ':0' : selector[0] + ':1';
  }

  clickHandler(selector) {
    const id = selector.join(':');
    const neighborId = this.invertor(id);    
    let newState = this.state.allButtons;

    newState[id] = !newState[id];

    if (newState[id] && newState[neighborId]) {
      newState[neighborId] = false;
    }

    this.setState({
      allbuttons: newState
    });
  };

  submitHandler() {
    console.log(this.state.allButtons);
  }

  render() {
    return (
      <div className={classes.Weekly}> 
        <h3>Неделя 1: Грин-Бэй в Лондоне</h3>

        <Questions 
          questions={this.state.questions}
          allButtons={this.state.allButtons}
          onClick={this.clickHandler.bind(this)}
        />
        <Button type="submit" onClick={() => this.submitHandler()}>
          Submit
        </Button>  
      </div>
    );
  }
}

export default ThisWeek;