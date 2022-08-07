
import React, { Component } from 'react';
import Week from '../../Components/Week/Week';
import axios from '../../axios/axios';
import Loader from '../../UI/Loader/Loader';

let id;

class CurrentWeek extends Component {

  state = {
    id: ''
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`pack/weeks.json`);
      id = Object.keys(response.data).slice(-1)[0].toString();

      this.setState({
        id: id
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        { this.state.id === ''
          ?  <Loader />
          :  <Week id={this.state.id}/>
        }
      </div>
    );
  };
}

export default CurrentWeek;
