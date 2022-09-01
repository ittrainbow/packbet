import React from 'react'
import YesNoButtons from '../YesNoButtons/YesNoButtons'
import classes from './Questions.module.scss'

const Questions = (props) => {
  return (
    props.questions.map((_, index) => {
      return (
        <div className={classes.Question} key={index}>
        {props.questions[index]}
          <YesNoButtons
            id={[index, 1]}
            index={index * 2 + 1}
            active={props.allButtons[index + ':' + 1]}
            onClick={props.onClick}
          />  
          <YesNoButtons
            id={[index, 0]}
            index={index * 2}
            active={props.allButtons[index + ':' + 0]}
            onClick={props.onClick}
          />
      </div>
      )
    })
  )
}

export default Questions