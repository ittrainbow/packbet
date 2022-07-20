import React from 'react';
import './Buttons.scss';
import {
  FaCheck,
  FaBan
} from 'react-icons/fa';

const Buttons = (props) => {
  let styleSet = ['button'];
  props.id[1] ? styleSet.push('red') : styleSet.push('green');

  if (props.active) {
    styleSet.push('selected');
  }
  
  return (
    <div className="buttonsDiv">
      <button 
        className={styleSet.join(' ')}
        onClick={() => props.onClick(props.id)}
      >
        {props.id[1] ? <FaBan/> : <FaCheck/>}
      </button>    

    </div>
  );
};

export default Buttons;