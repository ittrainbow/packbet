import React, { Component } from 'react';
import classes from './About.module.scss';

class About extends Component {
  today() {
    const old = new Date('2017-04-28 20:50')
    const today = new Date()
    console.log(old, today, old < today)
  }

  render() {
    return (
      <div className={classes.About}>
        { this.today() } 
      </div>
    );
  };
};

export default About;
