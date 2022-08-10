import React, { Component } from 'react';
import classes from './WeekList.module.scss';
import { NavLink } from 'react-router-dom';
import Loader from '../../UI/Loader/Loader';

import { connect } from 'react-redux';
import { SET_WEEK_ID } from '../../redux/types.js';

class WeekList extends Component {

  renderWeeks() {
    if (this.props.weeks) {
      return this.props.weeks.map((week) => {
        return (
          <li
            key={week.id}
            className={classes.Weeks}
          >
            { this.props.isAdmin 
              ? <NavLink 
                  onClick={() => this.props.setId(week.id)} 
                  to={'/weekeditor/' + week.id}
                >
                  #{week.number}: {week.name}
                </NavLink>
              : <NavLink 
                  onClick={() => this.props.setId(week.id)}
                  to={'/week/' + week.id}
                >
                  #{week.number}: {week.name}
                </NavLink>
            }
          </li>
        );
      });
    } else {
      return (
        <Loader/>
      );
    }
  }

  render() {
    return (
      <div className={classes.WeekList}>
        {this.renderWeeks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    weeks: state.weeks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setId: (id) => {
      const action = { type: SET_WEEK_ID, payload: id};
      dispatch(action);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeekList);
