import React from 'react';
import Questions from './Questions/Questions';
import Submit from './Submit/Submit';
import Header from './Header/Header';
import invertor from './functions/functions';
import * as weeks from '../../tasks';
import './index.scss';

const tasks = weeks.week01.tasks;

let createButtons = {};

for (let i=0; i<tasks.length; i++) {
  createButtons[`${i}:${0}`] = false;
  createButtons[`${i}:${1}`] = false;
}

class Week extends React.Component {
  state = {
    week: weeks.week01.number,
    name: weeks.week01.name, 
    questions: tasks,
    allButtons: createButtons
  };

  clickHandler(selector) {
    const id = selector.join(':');
    const neighborId = invertor(id);    
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
      <> 
        <Header 
          week={this.state.week} 
          name={this.state.name} 
        />
        <Questions 
          questions={this.state.questions}
          allButtons={this.state.allButtons}
          onClick={this.clickHandler.bind(this)}
        />
        <Submit 
          function={this.submitHandler.bind(this)}
        />
      </>
    );
  }
}

export default Week;