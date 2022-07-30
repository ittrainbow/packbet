import React from 'react';
import classes from './Edit.module.scss';
import { FaEdit } from 'react-icons/fa';

const Edit = (props) => {
  return (
    <button 
      className={classes.Edit}      
      onClick={props.onClick}
    >
      <FaEdit className={classes.Icon}/>
    </button>
  );
};

export default Edit;
