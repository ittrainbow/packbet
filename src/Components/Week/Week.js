import React, {Component} from 'react';
import classes from './Week.module.scss';
import Loader from '../../UI/Loader/Loader';
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons';
import Button from '../../UI/Button/Button';
import LogInMessage from '../../UI/LogInMessage/LogInMessage';
import structuredClone from '@ungap/structured-clone';

import { connect } from 'react-redux';
import { actionWeekId, actionButtonState } from '../../redux/actions/weekActions';

class Week extends Component {

  componentDidUpdate() {
    const fromLink = window.location.pathname.split('/').slice(-1).toString();

    if (this.props.weekid !== 0 && !this.props.weekid) {
      const id = fromLink.length < 3
        ? Number(fromLink)
        : this.props.currentweek;
      
        if (!this.props.currenweek) {
          this.props.setWeekId(id);
        }
    }
  }

  onClickHandler = (index) => {
    const state = structuredClone(this.props.buttons);    
    const i = Math.floor(index / 2);
    const yesno = index % 2;

    let status = state[this.props.weekid][i];

    if (yesno === 0) {
      status = (status !== true)
        ? true
        : null;
    }

    if (yesno === 1) {
      status = (status !== false)
        ? false
        : null;
    }

    state[this.props.weekid][i] = status;

    this.props.setButtonState(state);
  };

  submitHandler() {
  }

  renderQuestions(questions) {
    return (
      questions.map((question, index) => {
        const activity = this.props.buttons[this.props.weekid]
          ? this.props.buttons[this.props.weekid][index]
          : this.props.buttons[this.props.currentweek][index];
        
        return (          
          <div key={index} className={classes.Questions}>
            { question.question }
            { question.total > 1 ? `: ${question.total}` : null }
            <YesNoButtons
              index={index}
              activity={activity}
              onClick={(index) => this.onClickHandler(index)}
            />
          </div>
        );
      })
    );
  };

  render() {
    const id = this.props.weekid || this.props.weekid === 0
      ? this.props.weekid
      : this.props.currentweek;
      
    if (!this.props.isAuthenticated) {
      return (
        <LogInMessage />
      );

    } else if (this.props.weeks && this.props.isAuthenticated) {
      const thisweek = this.props.weeks[id];
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
    weeks: state.week.weeks,
    currentweek: state.week.currentweek,
    weekid: state.week.weekid,
    buttons: state.week.buttonstate,
    isAuthenticated: !!state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setWeekId: (id) => dispatch(actionWeekId(id)),
    setButtonState: (state) => dispatch(actionButtonState(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);