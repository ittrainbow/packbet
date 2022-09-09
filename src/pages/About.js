import React from 'react'
import About from '../Components/About/About'
import classes from './Pages.module.scss'

const Home = () => {
  return (
    <div className={classes.Container}>
      <h3>Конкурс прогнозов канала <a href="https://t.me/packersnews">Packers News</a></h3>
      <About />
    </div>
  )
}

export default Home
