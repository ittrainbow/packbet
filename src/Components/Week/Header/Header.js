import React from 'react';
import './Header.scss';

const Header = (props) => {
  return (
    <div className="header">Неделя {props.week}: {props.name}</div>
  );
};

export default Header;