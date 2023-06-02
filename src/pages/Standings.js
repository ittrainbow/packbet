import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import { useAppContext } from '../context/Context'
import { auth } from '../db'
import { i18n } from '../locale/locale'
import { OtherUser } from '../UI'
import { setTabActive } from '../helpers/tabActive'

export const Standings = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
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
      setTabActive(3)
      navigate('/season')
    }
    otherUserUID !== user.uid && setApp()
  }

  // locale
  const { tableNameMsg, tableCorrectMsg, tableTierline } = i18n(locale, 'standings')

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
        {standingsContext &&
          Object.values(standingsContext)
            .filter((el) => el.ansTotal > 0)
            .map((el) => {
              const { name, uid, ansCorrect, ansTotal, total, correct, position } = el
              return (
                <div key={uid} className="standings-header">
                  <div className="cellOne">{position}</div>
                  <div className="cellTwo" onClick={() => clickHandler({ uid, name })}>
                    {name}
                  </div>
                  <div className="cellThree">{ansCorrect + '/' + ansTotal}</div>
                  <div className="cellFour">{correct}</div>
                  <div className="cellThree">{total}</div>
                </div>
              )
            })}
        <div className="tierline">{tableTierline}</div>
      </div>
    </div>
  )
}
