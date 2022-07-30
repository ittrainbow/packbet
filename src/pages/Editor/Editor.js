import React, { Component } from 'react';
import classes from './Editor.module.scss';
import WeekList from '../../Components/WeekList/WeekList';

class Editor extends Component {
  render() {
    return (
      <div>      
        <h3 className={classes.Editor}>Редактор</h3>  
        <WeekList 
          isEditor={true}
        />
      </div>
    );
  };
};

export default Editor;
