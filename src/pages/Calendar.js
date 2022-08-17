import React from 'react';
import WeekList from '../Components/WeekList/WeekList';
import classes from './Pages.module.scss';

const Calendar = () => {
  return (
    <div className={classes.Container}>
      <h3>Календарь</h3>
      <WeekList />
    </div>
  );
};

export default Calendar;