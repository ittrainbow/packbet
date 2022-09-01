import React, { Component } from 'react'
import structuredClone from '@ungap/structured-clone'
import { connect } from 'react-redux'

import './Week.scss'
import Loader from '../../UI/Loader/Loader'
import YesNoButtons from '../../UI/YesNoButtons/YesNoButtons'
import Button from '../../UI/Button/Button'
import axios from '../../axios/axios'
import { actionWeekId } from '../../redux/actions/weekActions'
import { actionButtonState } from '../../redux/actions/authActions'
import { actionSwitchLoading } from '../../redux/actions/loadingActions'

class Week extends Component {

  today() {
    const today = new Date().toISOString().split('T').join(' ').substring(0, 16)
    const deadline = this.props.weeks[this.props.weekId].deadline

    return today < deadline
  }

  onClickHandler = (index) => {
    const state = structuredClone(this.props.buttons)    
    const i = Math.floor(index / 2)
    const yesno = index % 2

    let status = state[this.props.weekId][i]

    if (yesno === 0) {
      status = (status === 1)
        ? null
        : 1
    }

    if (yesno === 1) {
      status = (status === 2)
        ? null
        : 2
    }

    state[this.props.weekId][i] = status

    if (this.props.isAdmin || this.today()) {
      this.props.setButtonState(state)
    }
  }

  async submitHandler() {
    this.props.switchLoading(true)

    const data = this.props.buttons[this.props.weekId]
    const url = this.props.isAdmin
      ? `pack/answers/weeks/${this.props.weekId}.json`
      : `pack/users/${this.props.userId}/weeks/${this.props.weekId}.json`

    await axios.put(url, data)
    
    this.props.switchLoading(false)
  }

  renderQuestions(questions) {
    return (
      questions.map((question, index) => {
        const weekId = this.props.weekId
        const buttons = this.props.isItYou
          ? this.props.buttons
          : this.props.otherState
        const currentWeek = this.props.currentWeek        
        const answers = this.props.answers

        const activity = buttons[weekId]
          ? buttons[weekId][index]
          : buttons[currentWeek][index]

        const result = answers[weekId]
          ? answers[weekId][index]
          : answers[currentWeek][index]

        const styleSet = ['Questions']

        if (activity && result && !this.props.isAdmin && activity === result) {
          styleSet.push('QuestionCorrect')
        } else if (activity && result && !this.props.isAdmin && activity !== result) {
          styleSet.push('QuestionWrong')
        } else if (!activity || !result || this.props.isAdmin) {
          styleSet.push('QuestionUntouched')
        }
        
        return (          
          <div key={index} className={styleSet.join(' ')}>
            { question.question }
            { question.total ? `: ${question.total}` : 0 }
            <YesNoButtons
              index={index}
              activity={activity}
              onClick={(index) => this.onClickHandler(index)}
            />
          </div>
        )
      })
    )
  }

  render() {
    const id = this.props.weekId || this.props.weekId === 0
      ? this.props.weekId
      : this.props.currentWeek
      
    const thisweek = this.props.weeks[id]
    return (
      <div className='Week'> 
        <h3>#{ thisweek.number }: { thisweek.name }</h3>
        <div className='QuestionsBlockMargin'>
          { this.renderQuestions(thisweek.questions) }
        </div>
        { this.props.loading
            ? <Loader />
            : this.props.isItYou
                ? <Button
                    text='Submit'
                    onClick={ this.submitHandler.bind(this) }  
                    disabled={!this.today() && !this.props.isAdmin}
                  />
                : 'Для возвращения к своему профилю перейдите на вкладку Profile'
            
            

        }
        <div style={{marginTop: '10px'}}>
          { this.today()
              ? `Прогнозы принимаются до ${this.props.weeks[this.props.weekId].deadline}`
              : `Прогнозы принимались до ${this.props.weeks[this.props.weekId].deadline}`
          }
        </div>
      </div>
    )      
  }
}

function mapStateToProps(state) {
  return {
    weeks: state.week.weeks,
    otherState: state.others.buttonState,
    isItYou: state.others.isItYou,
    currentWeek: state.week.currentWeek,
    weekId: state.week.weekId,
    buttons: state.auth.buttonState,
    answers: state.auth.answerState,
    userId: state.auth.userId,
    isAdmin: state.auth.isAdmin,
    loading: state.loading.loading,
    message: state.loading.message
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchLoading: (status) => dispatch(actionSwitchLoading(status)),
    setWeekId: (id) => dispatch(actionWeekId(id)),
    setButtonState: (state) => dispatch(actionButtonState(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week)