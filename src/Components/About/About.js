import React from 'react'
import classes from './About.module.scss'

const About = () => {
  const src = 'https://github.com/ittrainbow/packbet'
  const obj = {
    App: 'Конкурс прогнозов',
    React: '18.2',
    'React-router-DOM': '6',
    'React-redux': '8.0.2',
    Author: 'Drew G',
    src: 'GitHub'
  }

  function render() {
    return Object.keys(obj).map((el, index) => {
      if (el === 'src') {
        return (
          <div key={index}>
            {el}: <a href={src}>GitHub</a>
          </div>
        )
      }

      return (
        <div key={index}>
          {el}: {obj[el]}
        </div>
      )
    })
  }

  return <div className={classes.About}>{render()}</div>
}

export default About
