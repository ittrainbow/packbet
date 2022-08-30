import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './WeekCreator.module.scss';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Undo from '../../UI/Undo/Undo';
import Edit from '../../UI/Edit/Edit';
import axios from '../../axios/axios';
import Loader from '../../UI/Loader/Loader';
import { actionInit, actionCurrentWeek, actionWeekId } from '../../redux/actions/weekActions';

class WeekCreator extends Component {

  state = {
    loading: false,
    currentWeek: '',
    currentName: '',
    questions: [
      { id: 0, question: 'Аарон Джонс ярдов на выносе больше', total: 85.5 },
      { id: 1, question: 'Кайлин Хилл снепов больше', total: 7.5 },
      { id: 2, question: 'Кристиан Уотсон тачдаун на приеме больше', total: 0.5 }
    ],
    currentQuestion: '',
    currentTotal: '',
    currentID: null,
    currentDeadline: null,
    amountOfWeeks: null,
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
      this.setState({ 
        currentWeek: event.target.value
      });
    } else if (tag === 'G') {
      this.setState({ 
        currentName: event.target.value 
      });
    } else if (tag === 'Q') {
      this.setState({ 
        currentQuestion: event.target.value 
      });
    } else if (tag === 'T') {
      this.setState({ 
        currentTotal: event.target.value 
      });
    } else if (tag === 'D') {
      this.setState({ 
        currentDeadline: event.target.value 
      });
    }
  };

  submitHandler = async (event) => {
    event.preventDefault();

    // this.setState({
    //   loading: true
    // });

    // const qs = this.state.questions.map((question, index) => {
    //   question['id'] = index;
    //   return question;
    // });

    // const week = {
    //   id: this.props.newWeek,
    //   number: this.props.newWeek + 1,
    //   name: this.state.currentName,
    //   questions: qs,
    //   deadline: this.state.currentDeadline
    // };

    // try {
    //   await axios.post('pack/weeks.json', week);

    //   this.setState({
    //     currentWeek: '',
    //     currentName: '',
    //     currentQuestion: '',
    //     currentTotal: '',
    //     currentID: null,
    //     currentDeadline: '',
    //     questions: []
    //   });

    //   const response = await axios.get('pack/weeks.json');
    //   const weeks = Object.keys(response.data)
    //     .map((el) => response.data[el]);
  
    //   this.props.actionInit(weeks);
    //   this.props.setCurrentWeek(weeks.length - 1);
    // } catch (error) {
    //   console.log(error);
    // }

    // this.setState({
    //   loading: false
    // });
    const time = new Date();
    console.log(time);
    <Navigate to='/' />
  };

  renderQuestions() {
    return (
      this.state.loading
        ? <Loader />
        : this.state.questions.map((question, index) => {
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
              type='number'
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
            text='Добавить'
            type='primary'
            onClick={(event) => this.addQuestionHandler(event)}
            disabled={
              this.state.currentQuestion.length === 0 ||
              this.state.currentTotal.length === 0
            }
          />

          <div className={classes.QuestionsList}>
            { this.renderQuestions() }    
            <div style={{marginTop: '10px', width: '200px'}}>
              <Input
                placeholder="yyyy-mm-dd hh:mm"
                label='Начало игры'
                value={this.state.currentDeadline}
                onChange={(event) => this.changeHandler(event, 'D')}
              />
            </div>
          </div>

          <Button
            text='Создать'
            type='success'
            onClick={this.submitHandler}
            // disabled={
            //   this.state.currentWeek.length === 0 ||
            //   !this.state.currentName ||
            //   !this.state.currentDeadline ||
            //   Object.keys(this.state.questions).length === 0
            // }
          />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    newWeek: state.week.currentWeek + 1,
    editorState: state.editor
  };
}

function mapDispatchToProps(dispatch) {
  return {    
    actionInit: (weeks) => dispatch(actionInit(weeks)),
    setWeekId: (id) => dispatch(actionWeekId(id)),
    setCurrentWeek: (currentWeek) => dispatch(actionCurrentWeek(currentWeek))
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(WeekCreator);