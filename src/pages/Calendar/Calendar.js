import React from 'react';
import WeekList from '../../Components/WeekList/WeekList';

const Calendar = () => {
  return (
    <div style={{marginTop: '20px', marginLeft: '20px'}}>
      <h3>Календарь</h3>
      <WeekList />
    </div>
  );
};

export default Calendar;