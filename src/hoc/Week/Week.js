import React, {Component} from 'react';
import classes from './Week.module.scss';
import axios from '../../axios/axios';
import Loader from '../../components/Loader/Loader';

const id = window.location.pathname.split('/').slice(-1).toString();

class Week extends Component {

  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    week: [],
    loading: true
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return ;
      }
    }

    const question = this.state.week[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results: results
      });

      const timeout = window.setTimeout(() => {
        if (this.isWeekFinished()) {
          this.setState({
            isFinished: true
          });
        } else {         
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results: results
      });
    }
  };

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };

  async componentDidMount() {

    try {
      const response = await axios.get(`/pack/${id}.json`);
      const week = response.data;

      this.setState({
        week: week,
        loading: false
      });
      
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }


  isWeekFinished() {
    console.log('week is over', this.state.activeQuestion + 1 === this.state.week.length);
    return this.state.activeQuestion + 1 === this.state.week.length;
  }

  render() {
    return (
      <div className={classes.Week}>
        <div className={classes.WeekWrapper}>
          <h1>Вопросы</h1>

          {this.state.loading 
            ? <Loader />
            : null}
        </div>
      </div>
    );
  }
}

export default Week;