import React, { Component } from 'react'
import About from '../Components/About/About'
import classes from './Pages.module.scss'
import { connect } from 'react-redux'
import { actionSetHeight } from '../redux/actions/viewActions'

class Home extends Component {
  componentDidMount() {
    if (!this.props.mobile) {
      const height = Math.max(
        document.getElementById('container').offsetHeight + 40,
        window.innerHeight
      )
      this.props.setHeight(height)
    }
  }

  render() {
    return (
      <div
        id="container"
        className={this.props.mobile ? classes.ContainerMobile : classes.Container}
      >
        <h3>
          Конкурс прогнозов <a href="https://t.me/packersnews">Packers News</a>
        </h3>
        <About />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mobile: state.view.mobile
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setHeight: (height) => dispatch(actionSetHeight(height))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
