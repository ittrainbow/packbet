import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'

import { selectAnswers, selectApp, selectTools, selectUser } from '../../redux/selectors'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../../redux/storetypes'
import { appActions, userActions } from '../../redux/slices'
import { useTableRow } from '../../hooks'

type StandingsRowType = {
  index: number
  fade: () => void
}

export const StandingsRow = ({ fade, index }: StandingsRowType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showBuddies, standingsSearch, showOneWeek } = useSelector(selectTools)
  const { duration } = useSelector(selectApp)
  const answers = useSelector(selectAnswers)
  const user = useSelector(selectUser)
  const { admin, buddies } = user

  const even = index % 2 === 0

  const handleClickOnUser = (otherUserName: string, otherUserUID: string) => {
    const { uid } = user
    if (uid && otherUserUID !== uid) {
      fade()
      setTimeout(() => {
        const otherUser = { otherUserName, otherUserUID, tabActive: 3 }
        dispatch(appActions.setOtherUserFromStandings(otherUser))
        admin && dispatch(userActions.setAdminAsPlayer(true))
        !answers[otherUserUID] && dispatch({ type: FETCH_OTHER_USER, payload: otherUserUID })
        navigate('/week')
      }, duration)
    }
  }

  const handleAddRemoveBuddy = (uid: string) => {
    !!user.name.length && dispatch({ type: SET_BUDDIES, payload: { buddyUid: uid, buddies } })
  }

  const { name, userAnswers, correctAdjusted, position, uid, tableFaults } = useTableRow(index)

  const buddy = buddies?.includes(uid)
  const colorStyle = uid === user.uid ? 'standings__me' : even ? 'standings__dark' : ''

  const row = (
    <div className="standings__row">
      <div className={`col col-zero pt6mob jcc ${colorStyle}`}>{position}</div>
      <div
        className={`col col-one jcc ${colorStyle}`}
        onClick={() => handleAddRemoveBuddy(uid)}
        style={{ color: buddy ? 'darkgoldenrod' : '#c7c7c7' }}
      >
        <FaStar />
      </div>
      <div
        className={`col col-two pt6mob ${colorStyle}`}
        onClick={() => handleClickOnUser(name, uid)}
        style={{ fontWeight: user.uid === uid ? 600 : '' }}
      >
        {name}
      </div>
      <div className={`col col-three jcc pt6mob ${colorStyle}`}>{userAnswers}</div>
      <div className={`col col-four jcc pt6mob ${colorStyle}`}>{correctAdjusted}</div>
      <div className={`col col-five jcc pt6mob ${colorStyle}`}>{showOneWeek ? '' : tableFaults}</div>
    </div>
  )

  const returnEmpty = !name.toLowerCase().includes(standingsSearch.toLowerCase()) || (showBuddies && !buddy)

  return returnEmpty ? null : row
}
