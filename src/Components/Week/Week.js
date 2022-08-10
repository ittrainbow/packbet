import React, {Component} from 'react';
import classes from './Week.module.scss';
import Loader from '../../UI/Loader/Loader';
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons';
import Button from '../../UI/Button/Button';
import structuredClone from '@ungap/structured-clone';

import { connect } from 'react-redux';
import { SET_BUTTONSTATE, SET_WEEK_ID } from '../../redux/types.js';

let id;

class Week extends Component {

  componentDidUpdate() {
    const fromLink = window.location.pathname.split('/').slice(-1).toString();

    if (isNaN(this.props.weekid)) {
      id = fromLink.length < 3
        ? id = Number(fromLink)
        : this.props.currentweek;
    }

    this.props.setId(id);
  }

  onClickHandler = (index) => {
    const state = structuredClone(this.props.buttons);    
    const i = Math.floor(index / 2);
    const yesno = index % 2;

    let status = state[this.props.weekid][i];

    if (yesno === 0) {
      if (status !== true) status = true;
      else status = null;
    }

    if (yesno === 1) {
      if (status !== false) status = false;
      else status = null;
    }

    state[this.props.weekid][i] = status;

    this.props.setButtonState(state);
  };

  submitHandler() {
  }

  renderQuestions(questions) {
    return (
      questions.map((question, index) => {
        return (          
          <div key={index} className={classes.Questions}>
            { question.question }
            { question.total > 1 ? `: ${question.total}` : null }
            <YesNoButtons
              index={index}
              activity={
                this.props.weekid || this.props.weekid === 0
                  ? this.props.buttons[this.props.weekid][index]
                  : null
              }
              onClick={(index) => this.onClickHandler(index)}
            />
          </div>
        );
      })
    );
  };

  render() {
    const thisid = isNaN(this.props.weekid) 
      ? this.props.currentweek 
      : this.props.weekid;
    if (this.props.weeks) {
      const thisweek = this.props.weeks[this.props.weekToRender || thisid];
      return (
        <div className={classes.Week}> 
          <h3>#{ thisweek.number }: { thisweek.name }</h3>
          <div className={classes.QuestionsBlockMargin}>
            { this.renderQuestions(thisweek.questions) }
          </div>
          <Button
            text='Submit'
            onClick={ this.submitHandler.bind(this) }  
          />
        </div>
      );
    } else {
      return (
        <Loader/>
      );
    }
  }
}

function mapStateToProps(state) {  
  return {
    weeks: state.weeks,
    currentweek: state.currentweek,
    weekid: state.weekid,
    buttons: state.buttonstate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setId: (id) => {
      const action = { type: SET_WEEK_ID, payload: id};
      dispatch(action);
    },
    setButtonState: (state) => {
      const action = { type: SET_BUTTONSTATE, payload: state};
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);