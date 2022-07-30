import React, { Component } from 'react';
import classes from './WeekEditor.module.scss';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import Input from '../../UI/Input/Input';
import axios from '../../axios/axios';
import Undo from '../../UI/Undo/Undo';
import Edit from '../../UI/Edit/Edit';

let thisPageID;

class WeekEditor extends Component {

  state = {
    currentID: '',
    week: '',
    name: '',
    questions: [],
    currentQuestion: '',
    currentTotal: '',
    loading: true
  };
  
  async componentDidMount() {
    thisPageID = window.location.pathname.split('/').slice(-1).toString();
    
    const response = await axios.get(`pack/${thisPageID}.json`);

    this.setState({
      name: response.data.name,
      week: response.data.week,
      questions: response.data.questions,
      loading: false
    });
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

    if (tag === 'Q') {
      this.setState({ currentQuestion: event.target.value });
    } else if (tag === 'T') {
      this.setState({ currentTotal: event.target.value });
    }
  };

  submitHandler = async (event) => {
    event.preventDefault();

    const qs = this.state.questions.map((question, index) => {
      console.log(question, index);
      question['id'] = index;
      console.log(question, index);
      return question;
    });

    const week = {
      week: this.state.currentWeek,
      name: this.state.currentName,
      questions: qs
    };

    try {
      await axios.post(`pack/${thisPageID}.json`, week);

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
          <div key={index} className={
              index === this.state.currentID
                ? classes.QuestionsActive
                : classes.Questions
            }>
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
          <h3>Неделя {this.state.week}: {this.state.name}</h3>
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
      <div className={classes.WeekEditor}>
        <div>
          <h3>Редактирование</h3>

          { this.state.loading
              ? <Loader />
              : <form>
                  {this.renderInputs()}
      
                  <Button
                    text="Сохранить"
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
                    text="На сервер"
                    type="success"
                    onClick={this.createWeekHandler}
                    disabled={
                      Object.keys(this.state.questions).length === 0
                    }
                  />
                </form>
          }
        </div>
      </div>
    );
  }
}

export default WeekEditor;
