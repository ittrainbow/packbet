import React, { Component } from "react"
import { connect } from "react-redux"
import classes from './OtherUser.module.scss'
import { actionCleanOtherUser } from '../../redux/actions/othersActions'
import Button from "../Button/Button"

class OtherUser extends Component {
  state = {
    isWeekList: false,
    isEditor: false
  }

  componentDidMount() {
    const url = window.location.href.split('/')
    const last = url[url.length - 1]
    
    if (last === 'editor' || last === 'calendar') {
      this.setState({
        isWeekList: true
      })
    }

    if (last === 'editor') {
      this.setState({
        isEditor: true
      });
    }
  }

  today() {
    const deadline = this.props.week.weekId ? this.props.week.weeks[this.props.week.weekId].deadline : null
    const currentTime = new Date().getTime()

    return currentTime < deadline
  }

  render() {
    if (!this.props.others.isItYou && !this.state.isEditor) {
      return (
        <div>
          <Button
            width={this.props.mobile ? 351 : 417}
            height={this.props.mobile ? 65 : 40}
            text={`Вы просматриваете ответы ${this.props.others.name}, нажмите для возврата к своим ответам`}
            onClick={() => this.props.cleanOtherUser()}
          />
          <div className={this.props.mobile ? classes.ActiveGamesNotifyMobile : classes.ActiveGamesNotify}>
            {this.today() && !this.state.isWeekList ? 'Чужие прогнозы для активных игр скрыты' : null}
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    week: state.week,
    mobile: state.view.mobile,
    others: state.others,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cleanOtherUser: () => dispatch(actionCleanOtherUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OtherUser)