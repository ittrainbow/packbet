import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector, useDispatch } from 'react-redux'

import { selectStandings, selectUser } from '../redux/selectors'
import { auth } from '../db'
import { i18n } from '../locale/locale'
import { OtherUser } from '../UI'
import { LocaleType } from '../types'
import { appActions } from '../redux/slices'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const standings = useSelector(selectStandings)
  const { locale } = useSelector(selectUser)

  const clickHandler = (otherUserUID: string, otherUserName: string) => {
    if (user && otherUserUID !== user.uid) {
      const otherUser = { otherUserName, otherUserUID, tabActive: 3, isItYou: false }
      dispatch(appActions.setOtherUserStandings(otherUser))
      navigate('/season')
    }
  }

  const { tableNameMsg, tableCorrectMsg, tableTierline } = i18n(locale, 'standings') as LocaleType

  return (
    <div className="container">
      <div className="standings">
        <OtherUser />
        <div className="standings-header">
          <div className="cellOne">#</div>
          <div className="cellTwo">{tableNameMsg}</div>
          <div className="cellThree">%</div>
          <div className="cellFour">{tableCorrectMsg}</div>
          <div className="cellThree">90%</div>
        </div>
        {standings &&
          Object.values(standings)
            .filter((el) => el.ansTotal > 0)
            .map((el) => {
              const { name, uid, ansCorrect, ansTotal, position, resultsTotal } = el
              return (
                <div key={uid} className="standings-header">
                  <div className="cellOne">{position}</div>
                  <div className="cellTwo" onClick={() => clickHandler(uid, name)}>
                    {name}
                  </div>
                  <div className="cellThree">{ansCorrect + '/' + ansTotal}</div>
                  <div className="cellFour">{(ansCorrect / ansTotal).toFixed(3)}</div>
                  <div className="cellThree">{((ansTotal * 100) / resultsTotal).toFixed(0)}%</div>
                </div>
              )
            })}
        <div className="tierline">{tableTierline}</div>
      </div>
    </div>
  )
}
