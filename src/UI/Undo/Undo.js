import React from 'react';
import classes from './Undo.module.scss';
import { FaUndo } from 'react-icons/fa';

const Undo = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={classes.Undo}
    >
      <FaUndo className={classes.Icon}/>
    </button>
  );
};

export default Undo;
