import React from 'react';
import classes from './Header.module.scss';

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <h3>
        Неделя {props.week}: {props.name}
      </h3>
    </div>
  );
};

export default Header;