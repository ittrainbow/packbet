import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './WeekEditor.module.scss';
import Button from '../../UI/Button/Button';
import Loader from '../../UI/Loader/Loader';
import Input from '../../UI/Input/Input';
import axios from '../../axios/axios';
import Undo from '../../UI/Undo/Undo';
import Edit from '../../UI/Edit/Edit';
import { actionInit, actionCurrentWeek, actionWeekId } from '../../redux/actions/weekActions';

class WeekEditor extends Component {

  state = {
    currentWeek: '',
    currentHash: null,
    id: null,
    name: '',
    questions: [],
    currentQuestion: '',
    currentTotal: '',
    loading: false
  };
  
  async componentDidMount() {
    this.setState({
      loading: true
    });

    const fromLink = window.location.pathname.split('/').slice(-1).toString();
    if (this.props.weekId !== 0 && !this.props.weekId) {
      const id = fromLink.length < 3
        ? Number(fromLink)
        : this.props.currentWeek;
      
        if (!this.props.currenweek) {
          this.props.setWeekId(id);
        }
    }
    
    const response = await axios.get('pack/weeks.json');
    const loadedWeek = Object.keys(response.data)
      .map((el) => response.data[el])
      .filter((el) => el.id === this.props.weekId)[0];

    this.setState({
      id: loadedWeek.id,
      name: loadedWeek.name,
      number: loadedWeek.number,
      questions: loadedWeek.questions,
      currentHash: Object.keys(response.data).filter((el) => response.data[el].id === this.props.weekId)[0],
      loading: false,
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

    this.setState({ loading: true });

    const qs = this.state.questions.map((question, index) => {
      question['id'] = index;
      return question;
    });

    const week = {
      id: this.state.id,
      name: this.state.name,
      number: this.state.number,
      questions: qs
    };

    try {
      await axios.put(`pack/weeks/${this.state.currentHash}.json`, week);;
      
      const response = await axios.get('pack/weeks.json');
      const weeks = Object.keys(response.data)
        .map((el) => response.data[el]);
  
      this.props.actionInit(weeks);   
    } catch (error) {
      console.log(error);
    }

    this.setState({ loading: false });
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
          <h3>Неделя {this.state.number}: {this.state.name}</h3>
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
                    text='Сохранить'
                    type='primary'
                    onClick={(event) => this.addQuestionHandler(event)}
                    disabled={
                      this.state.currentQuestion.length === 0 ||
                      this.state.currentTotal.length === 0
                    }
                  />
      
                  <div className={classes.QuestionsList}>
                    { this.renderQuestions() }    
                  </div>
                  
                  { this.state.loading
                    ? <Loader />
                    : <Button
                        text='На сервер'
                        type='success'
                        onClick={this.submitHandler}
                        disabled={
                          Object.keys(this.state.questions).length === 0
                        }
                      />
                  }

                </form>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    week: state.week,
    weekId: state.week.weekId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionInit: (weeks) => dispatch(actionInit(weeks)),
    setWeekId: (id) => dispatch(actionWeekId(id)),
    setCurrentWeek: (currentWeek) => dispatch(actionCurrentWeek(currentWeek))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekEditor);
