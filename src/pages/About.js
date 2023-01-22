import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { About } from '../Components'
import './Pages.css'
import { actionSetHeight } from '../redux/actions/viewActions'

export const Home = () => {
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
    // eslint-disable-next-line
  }, [])

  return (
    <div id="container" className={mobile ? 'ContainerMobile' : 'ContainerMod'}>
      <h3>
        Конкурс прогнозов <a href="https://t.me/packersnews">Packers News</a>
      </h3>
      <About />
    </div>
  )
}
