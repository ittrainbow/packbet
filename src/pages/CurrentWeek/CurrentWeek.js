import React from 'react';
import Week from '../../Components/Week/Week';

const CurrentWeek = () => {
  return (
    <div style={{marginTop: '20px', marginLeft: '20px'}}>
      <h3>Текущая неделя</h3>
      <Week />
    </div>
  );
};

export default CurrentWeek;
