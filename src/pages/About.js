import React from 'react'
import About from '../Components/About/About'
import classes from './Pages.module.scss'

const Home = () => {
  return (
    <div className={classes.Container}>
      <h3>About</h3>
      <About />
    </div>
  )
}

export default Home