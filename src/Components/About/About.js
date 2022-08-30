import React, { Component } from 'react';
import classes from './About.module.scss';

const About = () => {
  function today() {
    const date = new Date('2017-04-28 20:50')
    const today = new Date()
    return date < today
  }

  return (
    <div className={classes.About}>
      { today() } 
    </div>
  );
};

export default About;
