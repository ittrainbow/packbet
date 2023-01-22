import React from 'react'
import classes from './Loader.module.scss'

export const Loader = (props) => {
  return (
    <div className={classes.Center}>
      <div className={classes.ldsDualRing}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
