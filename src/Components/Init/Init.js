import React, { Component } from 'react';
import axios from '../../axios/axios';
import { connect } from 'react-redux';
import { APP_INIT, SET_CURRENT_WEEK } from '../../redux/types.js';

class Init extends Component {

  async componentDidMount() {
    try {
      const response = await axios.get('pack/weeks.json');
      const weeks = Object.keys(response.data)
        .map((el) => response.data[el]);
      const currentWeek = weeks.length - 1;

      this.props.appInit(weeks);      
      this.props.setCurrentWeek(currentWeek);
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Init);
