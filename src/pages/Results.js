import React from 'react';
import WeekList from '../Components/WeekList/WeekList';
import classes from './Pages.module.scss';

const Results = () => {
  return (
    <div className={classes.Container}>    
      <h3>Записать результаты</h3>  
      <WeekList />
    </div>
  );
};

export default Results;
