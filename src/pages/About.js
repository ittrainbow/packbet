import React from 'react'
import About from '../Components/About/About'
import classes from './Pages.module.scss'

const Home = () => {
  return (
    <div className={classes.Container}>
      <h3>Инфо</h3>
      <About />
    </div>
  )
}

export default Home