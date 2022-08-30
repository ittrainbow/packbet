import React from 'react';
import Table from '../Components/Table/Table';
import classes from './Pages.module.scss';

const Standings = () => {
  function today() {
    const date = new Date('2017-04-28 20:50');
    const today = new Date();
    const iff = (date < today)
      ? 'Ставки сделаны, ставок больше нет'
      : 'Введите прогноз';

    return iff;
  }

  return (
    <div className={classes.Container}>
      <h3>Standings</h3>
      <Table />
      { today() }
    </div>
  );
};

export default Standings;