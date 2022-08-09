import React from 'react';
import Week from '../../Components/Week/Week';

const OldWeek = () => {
  return (
    <div style={{marginTop: '20px', marginLeft: '20px'}}>
      <h3>Выбранная неделя</h3>
      <Week />
    </div>
  );
};

export default OldWeek;
