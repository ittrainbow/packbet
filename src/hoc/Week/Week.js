import React, {Component} from 'react';
import Questions from '../../components/Questions/Questions';
import Header from '../../components/Header/Header';
import classes from './Week.module.scss';
import Button from '../../components/Button/Button';
import * as weeks from '../../db';

const tasks = weeks.week01.tasks;

let createButtons = {};

for (let i=0; i<tasks.length; i++) {
  createButtons[`${i}:${0}`] = false;
  createButtons[`${i}:${1}`] = false;
}

class Week extends Component {
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
        <Header 
          week={this.state.week} 
          name={this.state.name} 
        />
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

export default Week;