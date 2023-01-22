import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import About from '../Components/About/About'
import classes from './Pages.module.scss'
import { actionSetHeight } from '../redux/actions/viewActions'

const Home = () => {
  const { mobile } = useSelector((state) => state.view)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      dispatch(actionSetHeight(height))
    }
    return
  }, [])

  return (
    <div id="container" className={mobile ? classes.ContainerMobile : classes.Container}>
      <h3>
        Конкурс прогнозов <a href="https://t.me/packersnews">Packers News</a>
      </h3>
      <About />
    </div>
  )
}

export default Home
