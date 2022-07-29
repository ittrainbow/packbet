import React, { Component } from 'react';
import classes from './WeekList.module.scss';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import axios from '../../axios/axios';

class WeekList extends Component {
  
  state = {
    weeks: [],
    loading: true
  };

  renderWeeks() {
    return this.state.weeks
      .map((week) => {
        return (
          <li
            key={week.id}
          >
            <NavLink
              to={'/week/' + week.id}
            >
              {week.name}
            </NavLink>
          </li>
        );
      });
  }
  
  async componentDidMount() {
    try {
      const response = await axios.get('pack.json');
      const weeks = [];

      Object.keys(response.data).forEach((key, index) => {
        weeks.push({
          id: key,
          name: `Неделя номер ${index + 1}`
        });
      });

      this.setState({
        weeks: weeks,
        loading: false
      });
    } catch (error) {
      console.log(error);
    }  
  }

  render() {
    return (
      <div className={classes.WeekList}>
        <div>
          <h3>Календарь</h3>
          {
            this.state.loading
              ? <Loader />
              : <ul>
                  {this.renderWeeks()}
                </ul>
          }

        </div>
      </div>
    );
  }
}

export default WeekList;
