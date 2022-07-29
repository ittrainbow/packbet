import axios from 'axios';
import React, { Component } from 'react';
import ThisWeek from '../../hoc/ThisWeek/ThisWeek';

class CurrentWeek extends Component {

  componentDidMount() {
    axios.get('https://react-quiz-25ea8-default-rtdb.firebaseio.com/pack.json')
      .then(response => {
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        <ThisWeek />
      </div>
    );
  }
}

export default CurrentWeek;
