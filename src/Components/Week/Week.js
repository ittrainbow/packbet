import React, {Component} from 'react';
import structuredClone from '@ungap/structured-clone';
import { connect } from 'react-redux';

import './Week.scss';
import Loader from '../../UI/Loader/Loader';
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons';
import Button from '../../UI/Button/Button';
import LogInMessage from '../../UI/LogInMessage/LogInMessage';
import axios from '../../axios/axios';
import { actionWeekId } from '../../redux/actions/weekActions';
import { actionButtonState } from '../../redux/actions/authActions';

class Week extends Component {

  state = {
    loading: false
  };

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
      status = (status !== 1)
        ? 1
        : 0;
    }

    if (yesno === 1) {
      status = (status !== 2)
        ? 2
        : 0;
    }

    state[this.props.weekid][i] = status;

    this.props.setButtonState(state);
  };

  async submitHandler() {
    this.setState({
      loading: true
    });

    const data = this.props.buttons[this.props.weekid];
    const url = this.props.isAdmin
      ? `pack/answers/weeks/${this.props.weekid}.json`
      : `pack/users/${this.props.userId}/weeks/${this.props.weekid}.json`;

    await axios.put(url, data);
    
    this.setState({
      loading: false
    });
  }

  renderQuestions(questions) {
    return (
      questions.map((question, index) => {
        const weekid = this.props.weekid;
        const buttons = this.props.buttons;
        const currentweek = this.props.currentweek;        
        const answers = this.props.answers;

        const activity = buttons[weekid]
          ? buttons[weekid][index]
          : buttons[currentweek][index];

        const result = answers[weekid]
          ? answers[weekid][index]
          : answers[currentweek][index];

        const styleSet = ['Questions'];

        if (activity && result && activity === result) {
          styleSet.push('QuestionCorrect');
        } else if (activity && result && activity !== result) {
          styleSet.push('QuestionWrong');
        } else if (!activity || !result) {
          styleSet.push('QuestionUntouched');
        }
        
        return (          
          <div key={index} className={styleSet.join(' ')}>
            { question.question }
            { question.total ? `: ${question.total}` : 0 }
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
        <div className='Week'> 
          <h3>#{ thisweek.number }: { thisweek.name }</h3>
          <div className='QuestionsBlockMargin'>
            { this.renderQuestions(thisweek.questions) }
          </div>
          { this.state.loading
              ? <Loader />
              : <Button
                  text='Submit'
                  onClick={ this.submitHandler.bind(this) }  
                />
              }
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
    buttons: state.auth.buttonState,
    answers: state.auth.answerState,
    isAuthenticated: !!state.auth.token,
    userId: state.auth.userId,
    isAdmin: state.auth.isAdmin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setWeekId: (id) => dispatch(actionWeekId(id)),
    setButtonState: (state) => dispatch(actionButtonState(state))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);