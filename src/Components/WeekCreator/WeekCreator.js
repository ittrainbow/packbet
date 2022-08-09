import React, { Component } from 'react';
import classes from './WeekCreator.module.scss';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Undo from '../../UI/Undo/Undo';
import Edit from '../../UI/Edit/Edit';
import axios from '../../axios/axios';

class WeekCreator extends Component {

  state = {
    currentWeek: '',
    currentName: '',
    questions: [
      {
        id: 0,
        question: 'Аарон Джонс ярдов на выносе больше',
        total: 85.5
      },
      {
        id: 1,
        question: 'Кайлин Хилл снепов больше',
        total: 7.5
      },
      {
        id: 2,
        question: 'Кристиан Уотсон тачдаун на приеме больше',
        total: 0.5
      }
    ],
    currentQuestion: '',
    currentTotal: '',
    currentID: null,
    amountOfWeeks: null
  };

  async componentDidMount() {
    try {
      const response = await axios.get('pack/weeks.json');
      const amountOfWeeks = Object.keys(response.data).length;
      
      this.setState({
        amountOfWeeks: amountOfWeeks
      });
    } catch (error) {
      console.log(error);
    }
  }

  addQuestionHandler = (event) => {
    event.preventDefault();

    const questions = this.state.questions;
    const id = this.state.currentID === null 
      ? this.state.questions.length 
      : this.state.currentID;

    const obj = {};
    obj['id'] = id;
    obj['question'] = this.state.currentQuestion;
    obj['total'] = this.state.currentTotal;

    questions[id] = obj;

    this.setState({
      currentQuestion: '',
      currentTotal: '',
      currentID: null,
      questions: questions
    });
  };

  editQuestionHandler = (index, event, question) => {
    event.preventDefault();
    
    this.setState({
      currentQuestion: question.question,
      currentTotal: question.total,
      currentID: index
    });
  };

  deleteQuestionHandler = (index, event) => {
    event.preventDefault();
    
    const questions = this.state.questions;
    questions.splice(index, 1);
    
    this.setState({
      questions: questions
    });
  };

  changeHandler = (event, tag) => {
    event.preventDefault();

    if (tag === 'W') {
      this.setState({ currentWeek: Number(event.target.value) });
    } else if (tag === 'G') {
      this.setState({ currentName: event.target.value });
    } else if (tag === 'Q') {
      this.setState({ currentQuestion: event.target.value });
    } else if (tag === 'T') {
      this.setState({ currentTotal: Number(event.target.value) });
    }
  };

  submitHandler = async (event) => {
    event.preventDefault();

    const qs = this.state.questions.map((question, index) => {
      question['id'] = index;
      return question;
    });

    const week = {
      id: this.state.amountOfWeeks,
      number: this.state.currentWeek,
      name: this.state.currentName,
      questions: qs
    };

    try {
      await axios.post('pack/weeks.json', week);

      this.setState({
        currentWeek: '',
        currentName: '',
        currentQuestion: '',
        currentTotal: '',
        currentID: null,
        questions: []
      });
    } catch (error) {
      console.log(error);
    }
  };

  renderQuestions() {
    return (
      this.state.questions.map((question, index) => {
        return (
          <div key={index} className={classes.Questions}>
            {question.question}: {question.total} 
            <Undo
              className={classes.Undo}
              onClick={(event) => this.deleteQuestionHandler(index, event, question)}
            />            
            <Edit
              className={classes.Undo}
              onClick={(event) => this.editQuestionHandler(index, event, question)}
            />
          </div>
        );
      })
    );
  };

  renderInputs() {
    return (
      <div className={classes.Inputs}>
        <div className={classes.Row}>
          <div className={classes.Week}>
            <Input
              label='Неделя'
              value={this.state.currentWeek}
              onChange={(event) => this.changeHandler(event, 'W')}
            />
          </div>
          <div className={classes.Name}>
            <Input
              label='Игра'
              value={this.state.currentName}
              onChange={(event) => this.changeHandler(event, 'G')}
            />
          </div>
        </div>
        
        <div className={classes.Row}>
          <div className={classes.Line}>          
            <Input 
              label='Линия'
              value={this.state.currentQuestion}
              onChange={(event) => this.changeHandler(event, 'Q')}
            />
          </div>
          <div className={classes.Total}>
            <Input
              label='Тотал'
              value={this.state.currentTotal}
              onChange={(event) => this.changeHandler(event, 'T')}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={classes.WeekCreator}>
        <form>
          {this.renderInputs()}

          <Button
            text="Добавить"
            type="primary"
            onClick={(event) => this.addQuestionHandler(event)}
            disabled={
              this.state.currentQuestion.length === 0 ||
              this.state.currentTotal.length === 0
            }
          />

          <div className={classes.QuestionsList}>
            { this.renderQuestions() }    
          </div>

          <Button
            text="Создать"
            type="success"
            onClick={this.submitHandler}
            disabled={
              this.state.currentWeek.length === 0 ||
              this.state.currentName.length === 0 ||
              Object.keys(this.state.questions).length === 0
            }
          />
        </form>
      </div>
    );
  }
}

export default WeekCreator;