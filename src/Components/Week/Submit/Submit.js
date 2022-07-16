import React from 'react';
import './Submit.scss';

const Submit = (props) => {
  return (    
    <button 
      className="submit"
      onClick={props.function}
    >
      Submit
    </button>
  );
};

export default Submit;