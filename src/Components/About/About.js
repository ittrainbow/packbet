import React from 'react'
import classes from './About.module.scss'

const About = () => {

  function render() {
    const obj = {
      'App': 'Конкурс прогнозов',
      'React': '18.2',
      'React-router-DOM': '6',
      'React-redux': '8.0.2'
    }

    return Object.keys(obj)
      .map((el, index) => {
        return (
          <div key={index}>
            {el}: {obj[el]}
          </div>
        )
      })
  }


  return (
    <div className={classes.About}>
      { render() }
    </div>
  );
};

export default About
