import React from 'react';
import classes from './MenuBackDrop.module.scss';

const MenuBackDrop = (props) => {
  return (
    <div
      className={classes.BackDrop}
      onClick={props.onClick}
    />
  );
};

export default MenuBackDrop;