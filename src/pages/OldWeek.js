import React from 'react';
import Week from '../Components/Week/Week';
import classes from './Pages.module.scss';

const OldWeek = () => {
  return (
    <div className={classes.Container}>
      <h3>Выбранная неделя</h3>
      <Week />
    </div>
  );
};

export default OldWeek;
