import React from 'react';
import './Buttons.scss';

const Buttons = (props) => {
  let styleSet = ['button', 'fa'];
  props.id[1] ? styleSet.push('red') : styleSet.push('green');
  props.id[1] ? styleSet.push('fa-times') : styleSet.push('fa-check');

  if (props.active) {
    styleSet.push('selected');
  }
  
  return (
    <div className="buttonsDiv">
      <button 
        className={styleSet.join(' ')}
        onClick={() => props.onClick(props.id)}
      >
      </button>    

    </div>
  );
};

export default Buttons;