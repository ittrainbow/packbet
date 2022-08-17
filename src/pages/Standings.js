import React from 'react';
import Table from '../Components/Table/Table';
import classes from './Pages.module.scss';

const Standings = () => {
  return (
    <div className={classes.Container}>
      <h3>Standings</h3>
      <Table />
    </div>
  );
};

export default Standings;