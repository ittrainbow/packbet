import React, {Component} from 'react';
import classes from './Week.module.scss';
import Loader from '../../UI/Loader/Loader';
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons';
import Button from '../../UI/Button/Button';

import { connect } from 'react-redux';
import { SET_BUTTONSTATE, SET_WEEK_ID } from '../../redux/types.js';

let id;

class Week extends Component {

  state = {
    buttonState: {}
  };

  componentDidMount() {
    const fromLink = window.location.pathname.split('/').slice(-1).toString();

    id = fromLink.length < 3
      ? id = Number(fromLink)
      : this.props.currentweek;

    this.props.setId(id);
  }

  onClickHandler = (index, props) => {
    const buttonState = this.props.buttonstate;

    buttonState[index] = buttonState[index] !== props
      ? props
      : null;

    this.setState({
      buttonState: buttonState
    });
  };

  submitHandler() {
    console.log(this.state.buttonState);
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
              activity={this.state.buttonState[index]}
              onClick={this.onClickHandler.bind(this)}
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
      const thisweek = this.props.weeks[thisid];
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
    buttonstate: state.buttonstate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setId: (id) => {      
      const action = { type: SET_WEEK_ID, payload: id};
      dispatch(action);
    },
    setButtonState: (buttons) => {
      const action = { type: SET_BUTTONSTATE, payload: buttons};
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Week);