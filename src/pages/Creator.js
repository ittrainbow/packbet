import React from 'react';
import WeekCreator from '../Components/WeekCreator/WeekCreator';
import classes from './Pages.module.scss';
import { setEditorCurrentName, setEditorQuestions } from '../redux/actions/editorActions';
import { connect } from 'react-redux';

const Creator = (props) => {
  props.setCurrentName('');
  props.setQuestions([]);
  return (
    <div className={classes.Container}>
      <h3>Создание недели</h3>
      <WeekCreator />
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setCurrentName: (currentName) => dispatch(setEditorCurrentName(currentName)),
    setQuestions: (questions) => dispatch(setEditorQuestions(questions))
  };
}

export default connect(null, mapDispatchToProps)(Creator);
