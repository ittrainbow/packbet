import React from 'react';
import WeekCreator from '../Components/WeekCreator/WeekCreator';
import classes from './Pages.module.scss';

const Creator = () => {
  return (
    <div className={classes.Container}>
      <h3>Создание недели</h3>
      <WeekCreator />
    </div>
  );
};

export default Creator;
