import React from 'react';

const Header = (props) => {
  return (
    <div className="header">Неделя {props.week}: {props.name}</div>
  );
};

export default Header;