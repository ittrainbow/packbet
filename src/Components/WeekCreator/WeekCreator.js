import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import structuredClone from '@ungap/structured-clone';

import classes from './WeekCreator.module.scss';
import './WeekCreator.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Undo from '../../UI/Undo/Undo';
import Edit from '../../UI/Edit/Edit';
import axios from '../../axios/axios';
import Loader from '../../UI/Loader/Loader';
import { actionInit } from '../../redux/actions/weekActions';
import { 
  setEditorCurrentWeek,
  setEditorCurrentName,
  setEditorCurrentQuestion,
  setEditorCurrentTotal,
  setEditorCurrentID,
  setEditorCurrentDeadline,
  setEditorQuestions
} from '../../redux/actions/editorActions';
import { switchLoading } from '../../redux/actions/loadingActions';

const WeekCreator = (props) => {
  const navigate = useNavigate();

  function addQuestionHandler(event) {
    event.preventDefault();
    props.switchLoading(true);

    const id = props.editor.currentID 
      ? props.editor.currentID 
      : props.editor.currentID === 0
          ? props.editor.currentID
          : props.editor.questions.length;

    const obj = {};
    obj['id'] = id;
    obj['question'] = props.editor.currentQuestion;
    obj['total'] = props.editor.currentTotal;

    const setQuestions = structuredClone(props.editor.questions);
    setQuestions[id] = obj;
    
    props.setQuestions(setQuestions);
    props.setCurrentQuestion('');
    props.setCurrentTotal('');    
    props.switchLoading(false);
    props.setCurrentID('');
  };

  function editQuestionHandler(question) {
    props.setCurrentQuestion(question.question);
    props.setCurrentID(question.id);
    props.setCurrentTotal(question.total);
  };

  function deleteQuestionHandler(index) {
    const questions = structuredClone(props.editor.questions);
    questions.splice(index, 1);
    props.setQuestions(questions);
  };

  function changeHandler (event, tag) {
    if (tag === 'setCurrentWeek') props.setCurrentWeek(Number(event.target.value));
    if (tag === 'setCurrentName') props.setCurrentName(event.target.value);
    if (tag === 'setCurrentQuestion') props.setCurrentQuestion(event.target.value);
    if (tag === 'setCurrentTotal') props.setCurrentTotal(event.target.value);
    if (tag === 'setCurrentDeadline') props.setCurrentDeadline(event.target.value);
  };

  async function submitHandler () {
    props.switchLoading(true);

    const qs = props.editor.questions.map((question, index) => {
      question['id'] = index;
      return question;
    });

    const week = {
      id: props.weeks.length,
      number: props.editor.currentWeek,
      name: props.editor.currentName,
      questions: qs,
      deadline: props.editor.currentDeadline
    };

    const weeks = structuredClone(props.weeks);
    weeks.push(week);

    await axios.post('pack/weeks.json', week);

    props.setCurrentWeek(weeks.length - 1);
    props.actionInit(weeks);
    props.switchLoading(false);

    navigate('/calendar');
  };

  function renderQuestions() {
    return (
      props.loading
        ? <Loader />
        : props.editor.questions.map((question, index) => {
            return (
              <div key={index} className='Questions'>
                {question.question}: {question.total}
                <div className='UndoEdit'>
                  <Undo onClick={() => deleteQuestionHandler(index)} />                  
                  <Edit onClick={(event) => editQuestionHandler(question)} />
                </div>
              </div>
            );
          })
    );
  };

  function renderInputs() {
    return (
      <div className={classes.Inputs}>
        <div className={classes.Row}>
          <div className={classes.Week}>
            <Input
              label='Неделя'
              value={props.editor.currentWeek || ''}
              onChange={(event) => changeHandler(event, 'setCurrentWeek')}
            />
          </div>
          <div className={classes.Name}>
            <Input
              label='Игра'
              value={props.editor.currentName || ''}
              onChange={(event) => changeHandler(event, 'setCurrentName')}
            />
          </div>
        </div>
        
        <div className={classes.Row}>
          <div className={classes.Line}>          
            <Input 
              label='Линия'
              value={props.editor.currentQuestion}
              onChange={(event) => changeHandler(event, 'setCurrentQuestion')}
            />
          </div>
          <div className={classes.Total}>
            <Input
              label='Тотал'
              type='number'
              value={props.editor.currentTotal}
              onChange={(event) => changeHandler(event, 'setCurrentTotal')}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.WeekCreator}>    
      <div>{renderInputs()}</div>
      
      <div>        
        <Button
          text='Добавить'
          onClick={(event) => addQuestionHandler(event)}
          disabled={
            !props.editor.currentQuestion ||
            !props.editor.currentTotal
          }
        />
      </div>

      <div className={classes.QuestionsList}>
        { renderQuestions() }    
        <div style={{marginTop: '10px', width: '200px'}}>
          <Input
            placeholder="yyyy-mm-dd hh:mm"
            label='Начало игры'
            value={props.editor.currentDeadline}
            onChange={(event) => changeHandler(event, 'setCurrentDeadline')}
          />
        </div>
      </div>

      <Button
        text='Создать'
        onClick={() => submitHandler()}
        disabled={
          !props.editor.currentName ||
          !props.editor.currentDeadline ||
          !(props.editor.currentWeek || props.editor.currentWeek === 0) ||
          props.editor.questions.length === 0
        }
      />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    editor: state.editor,
    loading: state.loading.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(switchLoading(status)),

    actionInit: (weeks) => dispatch(actionInit(weeks)),

    setCurrentWeek: (currentWeek) => dispatch(setEditorCurrentWeek(currentWeek)),
    setCurrentName: (currentName) => dispatch(setEditorCurrentName(currentName)),
    setCurrentQuestion: (currentQuestion) => dispatch(setEditorCurrentQuestion(currentQuestion)),
    setCurrentTotal: (currentTotal) => dispatch(setEditorCurrentTotal(currentTotal)),
    setCurrentID: (currentID) => dispatch(setEditorCurrentID(currentID)),
    setCurrentDeadline: (currentDeadline) => dispatch(setEditorCurrentDeadline(currentDeadline)),
    setQuestions: (questions) => dispatch(setEditorQuestions(questions))
  };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(WeekCreator);