import React from 'react';
import './Questions.scss';
import Buttons from '../Buttons/Buttons';

const Questions = (props) => {
  return (
    props.questions.map((_, index) => {
      return (
        <div className="question" key={index}>
        {props.questions[index]}
          <Buttons
            id={[index, 1]}
            index={index * 2 + 1}
            active={props.allButtons[index + ':' + 1]}
            onClick={props.onClick}
          />  
          <Buttons
            id={[index, 0]}
            index={index * 2}
            active={props.allButtons[index + ':' + 0]}
            onClick={props.onClick}
          />
      </div>
      );
    })
  );
};

export default Questions;