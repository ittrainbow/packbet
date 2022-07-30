import React, { Component } from 'react';
import classes from './WeekList.module.scss';
import { NavLink } from 'react-router-dom';
import Loader from '../../UI/Loader/Loader';
import axios from '../../axios/axios';

class WeekList extends Component {
  
  state = {
    weeks: [],
    loading: true,
    isAdmin: true
  };

  renderWeeks() {
    return this.state.weeks
      .map((week) => {
        return (
          <li
            key={week.id}
            className={classes.Weeks}
          >
            { this.props.isEditor 
                ? <NavLink to={'/weekeditor/' + week.id}>{week.name}</NavLink>
                : <NavLink to={'/week/' + week.id}>{week.name}</NavLink>
            }
          </li>
        );
      });
  }
  
  async componentDidMount() {
    try {
      const response = await axios.get('pack.json');
      const weeks = [];

      Object.keys(response.data).forEach((key) => {
        weeks.push({
          id: key,
          name: `Неделя ${response.data[key].week}: ${response.data[key].name}`
        });
      });

      this.setState({
        loading: false,
        weeks: weeks
      });
    } catch (error) {
      console.log(error);
    }  
  }

  render() {
    return (
      <div className={classes.WeekList}>
        <div>
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
