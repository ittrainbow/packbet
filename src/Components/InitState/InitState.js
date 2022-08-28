import React, { Component } from 'react';
import axios from '../../axios/axios';
import { connect } from 'react-redux';
import { actionInit, actionCurrentWeek } from '../../redux/actions/weekActions';

class InitState extends Component {

  async componentDidMount() {
    try {
      const response = await axios.get('pack/weeks.json');
      const weeks = Object.keys(response.data)
        .map((el) => response.data[el]);

      this.props.appInit(weeks);      
      this.props.setCurrentWeek(weeks.length - 1);
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

function mapStateToProps(state) {
  return {
    userButtons: state.auth.buttons
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appInit: (weeks) => dispatch(actionInit(weeks)),
    setCurrentWeek: (currentWeek) => dispatch(actionCurrentWeek(currentWeek)),
    // setButtonState: (buttonState) => dispatch(actionButtonState(buttonState))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitState);
