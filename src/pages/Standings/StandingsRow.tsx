import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { FaStar } from 'react-icons/fa'
import { IUserStandings } from '../../types'
import { getTableRowParams } from '../../helpers'
import { appActions, userActions } from '../../redux/slices'
import { selectApp, selectUser } from '../../redux/selectors'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../../redux/storetypes'

type StandingsRowType = {
  el: IUserStandings
  index: number
  fade: () => void
}

export const StandingsRow = ({ el, index, fade }: StandingsRowType) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const { admin, buddies } = user
  const { duration } = useSelector(selectApp)

  const handleClickOnUser = (otherUserName: string, otherUserUID: string) => {
    const { uid } = user
    if (uid && otherUserUID !== uid) {
      fade()
      setTimeout(() => {
        const otherUser = { otherUserName, otherUserUID, tabActive: 3, isItYou: false }
        dispatch(appActions.setOtherUserFromStandings(otherUser))
        admin && dispatch(userActions.setAdminAsPlayer(true))
        dispatch({ type: FETCH_OTHER_USER, payload: otherUserUID })
        navigate('/season')
      }, duration)
    }
  }

  const handleAddRemoveBuddy = (uid: string) => {
    !!user.name.length && dispatch({ type: SET_BUDDIES, payload: { buddyUid: uid, buddies } })
  }

  const getCellClass = (className: string, index: number) => `${className} ${index % 2 === 0 ? 'standings__dark' : ''}`
  const { name, answers, correct, position, uid, faults } = getTableRowParams(el)
  const buddy = buddies?.includes(uid)

  return (
    <div className="standings__row">
      <div className={getCellClass('col-zero', index)}>{position}</div>
      <div
        className={getCellClass('col-one', index)}
        onClick={() => handleAddRemoveBuddy(uid)}
        style={{ color: buddy ? 'darkgoldenrod' : '#c7c7c7' }}
      >
        <FaStar />
      </div>
      <div
        className={getCellClass('col-two', index)}
        onClick={() => handleClickOnUser(name, uid)}
        style={{ fontWeight: user.uid === uid ? 600 : '' }}
      >
        {name}
      </div>
      <div className={getCellClass('col-three', index)}>{answers}</div>
      <div className={getCellClass('col-four', index)}>{correct}</div>
      <div className={getCellClass('col-five', index)}>{faults}</div>
    </div>
  )
}
