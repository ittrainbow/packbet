import React, { Component } from 'react';
import axios from '../../axios/axios';
import { connect } from 'react-redux';
import { actionInit, actionCurrentWeek, actionButtonState } from '../../redux/actions';

class InitState extends Component {

  async componentDidMount() {
    try {
      const response = await axios.get('pack/weeks.json');
      const buttonState = {};
      const weeks = Object.keys(response.data)
        .map((el) => response.data[el]);

      for (let i=0; i<weeks.length; i++) {
        const buttonsWeekly = {};

        for (let j=0; j<Object.keys(weeks[i].questions).length; j++) {
          buttonsWeekly[j] = null;
        }

        buttonState[i] = buttonsWeekly;
      }

      this.props.appInit(weeks);      
      this.props.setCurrentWeek(weeks.length - 1);
      this.props.setButtonState(buttonState);
    } catch (error) {
      console.log(error);
    }
  }
   
  render() {
    return (
      <div>
      </div>
    );
  }
};

function mapStateToProps() {
  return {
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appInit: (weeks) => dispatch(actionInit(weeks)),
    setCurrentWeek: (currentWeek) => dispatch(actionCurrentWeek(currentWeek)),
    setButtonState: (buttonState) => dispatch(actionButtonState(buttonState))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitState);
