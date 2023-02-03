import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Standings.scss'

import { Context } from '../../App'
import { setEditor } from '../../redux/actions'
import { auth } from '../../db'
import { i18n } from '../../locale/locale'

export const Standings = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userContext, standingsContext, appContext, setAppContext } = useContext(Context)
  const { locale } = userContext

  const getPosition = (i) =>
    i > 0 && standingsContext[i].correct === standingsContext[i - 1].correct ? '-' : i + 1

  const clickHandler = (uid, name) => {
    const otherUser = uid !== user.uid
    const obj = {
      ...appContext,
      otherUserUID: otherUser ? uid : null,
      otherUserName: otherUser ? name : null,
      isItYou: otherUser ? false : true
    }
    setAppContext(obj)
    dispatch(setEditor(false))
    navigate('/calendar')
  }

  const { tableNameMsg, tableCorrectMsg } = i18n(locale, 'standings')

  return (
    <div className="container">
      <div className="standings">
        <div className="standings-header">
          <div className="cellOne">#</div>
          <div className="cellTwo">{tableNameMsg}</div>
          <div className="cellThree"></div>
          <div className="cellFour">{tableCorrectMsg}</div>
          <div className="cellThree">90%</div>
        </div>
        {Object.keys(standingsContext).map((el, index) => {
          const { name, uid, slash, total, correct } = standingsContext[el]
          return (
            <div key={index} className="standings-header">
              <div className="cellOne">{getPosition(index)}</div>
              <div className="cellTwo" onClick={() => clickHandler(uid, name)}>
                {name}
              </div>
              <div className="cellThree">{slash}</div>
              <div className="cellFour">{correct}</div>
              <div className="cellThree">{total}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
