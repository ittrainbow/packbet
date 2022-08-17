import React from 'react';
import WeekList from '../Components/WeekList/WeekList';
import classes from './Pages.module.scss';

const Editor = () => {
  return (
    <div className={classes.Container}>    
      <h3>Редактор</h3>  
      <WeekList />
    </div>
  );
};

export default Editor;
