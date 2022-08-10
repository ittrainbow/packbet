import React, { Component } from 'react';
import axios from '../../axios/axios';
import { connect } from 'react-redux';
import { APP_INIT, SET_CURRENT_WEEK, SET_BUTTONSTATE } from '../../redux/types.js';

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
    setCurrentWeek: (currentWeek) => {
      const action = { type: SET_CURRENT_WEEK, payload: currentWeek};
      dispatch(action);
    },
    appInit: (weeks) => {
      const action = { type: APP_INIT, payload: weeks};
      dispatch(action);
    },
    setButtonState: (state) => {
      const action = { type: SET_BUTTONSTATE, payload: state};
      dispatch(action);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitState);
