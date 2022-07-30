import React from 'react';
import classes from './Calendar.module.scss';
import WeekList from '../../Components/WeekList/WeekList';

const Calendar = () => {
  return (
    <div>
      <h3 className={classes.Calendar}>Календарь</h3>
      <WeekList 
        isEditor={false}
      />
    </div>
  );
};

export default Calendar;