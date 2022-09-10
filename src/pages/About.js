import React from 'react'
import About from '../Components/About/About'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'

const Home = (props) => {
  return (
    <div className={props.mobile ? classes.ContainerMobile : classes.Container}>
      <h4>Конкурс прогнозов <a href="https://t.me/packersnews">Packers News</a></h4>
      <About />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

export default connect(mapStateToProps, null)(Home)
