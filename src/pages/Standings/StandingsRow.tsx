import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { FaStar } from 'react-icons/fa'
import { IUserStandings } from '../../types'
import { getTableRowParams } from '../../helpers'
import { appActions, userActions } from '../../redux/slices'
import { selectAnswers, selectApp, selectUser } from '../../redux/selectors'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../../redux/storetypes'

type StandingsRowType = {
  el: IUserStandings
  even: boolean
  fade: () => void
}

export const StandingsRow = ({ el, even, fade }: StandingsRowType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const answers = useSelector(selectAnswers)
  const user = useSelector(selectUser)
  const { admin, buddies } = user
  const { duration } = useSelector(selectApp)

  const handleClickOnUser = (otherUserName: string, otherUserUID: string) => {
    const { uid } = user
    if (uid && otherUserUID !== uid) {
      fade()
      setTimeout(() => {
        const otherUser = { otherUserName, otherUserUID, tabActive: 3 }
        dispatch(appActions.setOtherUserFromStandings(otherUser))
        admin && dispatch(userActions.setAdminAsPlayer(true))
        !answers[otherUserUID] && dispatch({ type: FETCH_OTHER_USER, payload: otherUserUID })
        navigate('/season')
      }, duration)
    }
  }

  const handleAddRemoveBuddy = (uid: string) => {
    !!user.name.length && dispatch({ type: SET_BUDDIES, payload: { buddyUid: uid, buddies } })
  }

  const { name, userAnswers, correct, position, uid, faults } = getTableRowParams(el)
  const buddy = buddies?.includes(uid)

  return (
    <div className="standings__row">
      <div className={`col-zero ${even ? 'standings__dark' : ''}`}>{position}</div>
      <div
        className={`col-one ${even ? 'standings__dark' : ''}`}
        onClick={() => handleAddRemoveBuddy(uid)}
        style={{ color: buddy ? 'darkgoldenrod' : '#c7c7c7' }}
      >
        <FaStar />
      </div>
      <div
        className={`col-two ${even ? 'standings__dark' : ''}`}
        onClick={() => handleClickOnUser(name, uid)}
        style={{ fontWeight: user.uid === uid ? 600 : '' }}
      >
        {name}
      </div>
      <div className={`col-three ${even ? 'standings__dark' : ''}`}>{userAnswers}</div>
      <div className={`col-four ${even ? 'standings__dark' : ''}`}>{correct}</div>
      <div className={`col-five ${even ? 'standings__dark' : ''}`}>{faults}</div>
    </div>
  )
}
