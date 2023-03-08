import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Standings.scss'

import { useAppContext } from '../../context/Context'
import { setEditor } from '../../redux/actions'
import { auth } from '../../db'
import { i18n } from '../../locale/locale'
import { OtherUser } from '../../UI'

export const Standings = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userContext, standingsContext, appContext, setAppContext } = useAppContext()
  const { locale } = userContext

  const clickHandler = ({ uid: otherUserUID, name: otherUserName }) => {
    const setApp = () => {
      setAppContext({
        ...appContext,
        otherUserUID,
        otherUserName,
        isItYou: false,
        tabActive: 3
      })
      dispatch(setEditor(false))
      navigate('/calendar')
    }
    otherUserUID !== user.uid && setApp()
  }

  // locale
  const { tableNameMsg, tableCorrectMsg } = i18n(locale, 'standings')

  return (
    <div className="container">
      <div className="standings">
        <OtherUser />
        <div className="standings-header">
          <div className="cellOne">#</div>
          <div className="cellTwo">{tableNameMsg}</div>
          <div className="cellThree"></div>
          <div className="cellFour">{tableCorrectMsg}</div>
          <div className="cellThree">90%</div>
        </div>
        {standingsContext && Object.values(standingsContext).map((el, index) => {
          const { name, uid, slash, total, correct, position } = el
          return (
            <div key={index} className="standings-header">
              <div className="cellOne">{position}</div>
              <div className="cellTwo" onClick={() => clickHandler({ uid, name })}>
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
