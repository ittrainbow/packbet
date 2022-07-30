import React from 'react';
import './YesNoButtons.scss';
import {
  FaCheck,
  FaBan
} from 'react-icons/fa';

const YesNoButtons = (props) => {
  let styleSetFirst = ['button', 'red'];
  let styleSetSecond = ['button', 'green'];

  if (props.activity === 'yes') {
    styleSetFirst.push('selected');
  } else if (props.activity === 'no') {    
    styleSetSecond.push('selected');
  }
  
  return (
    <div className="buttonsDiv">
      <button 
        className={styleSetFirst.join(' ')}
        onClick={() => props.onClick(props.index, 'yes')}
      >
        <FaCheck />
      </button>

      <button 
        className={styleSetSecond.join(' ')}
        onClick={() => props.onClick(props.index, 'no')}
      >
        <FaBan />
      </button>
    </div>
  );
};

export default YesNoButtons;