import React, {Component} from 'react';
import classes from './Week.module.scss';
import axios from '../../axios/axios';
import Loader from '../../UI/Loader/Loader';
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons';
import Button from '../../UI/Button/Button';

class Week extends Component {

  state = {
    id: '',
    week: '',
    name: '', 
    questions: [],
    loading: true,
    buttonState: {}
  };

  async componentDidMount() {
    const id = this.props.id
      ? this.props.id
      : window.location.pathname.split('/').slice(-1).toString();

    try {
      const response = await axios.get(`pack/${id}.json`);
      const buttonState = {};

      Object.keys(response.data.questions).forEach((_, index) => {
        buttonState[index] = null;
      });

      this.setState({
        id: id,
        week: response.data.week,
        name: response.data.name,
        questions: response.data.questions,
        loading: false,
        buttonState: buttonState
      });
    } catch (error) {
      console.log(error);
    }
  }

  onClickHandler = (index, props) => {
    const buttonState = this.state.buttonState;

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

  renderQuestions() {
    return (
      this.state.questions.map((question, index) => {
        return (
          <div key={index} className={classes.Questions}>
            {question.question}: {question.total} 
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
    return (
      <div className={classes.Week}> 
        <h3>Неделя {this.state.week}: {this.state.name}</h3>
        <div className={classes.QuestionsBlockMargin}>
          { this.state.loading
              ? <Loader />
              : this.renderQuestions() 
          }
        </div>
        <Button 
          text='Submit'
          onClick={this.submitHandler.bind(this)}  
        />
      </div>
    );
  }
}

export default Week;