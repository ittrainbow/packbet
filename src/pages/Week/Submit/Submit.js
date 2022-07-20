import React from 'react';

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