import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { useTableRow } from '../../hooks'
import { selectAnswers, selectApp, selectTools, selectUser } from '../../redux/selectors'
import { appActions, userActions } from '../../redux/slices'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../../redux/storetypes'

type Props = {
  index: number
  fade: () => void
}

export const StandingsRow = ({ fade, index }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showBuddies, standingsSearch, showOneWeek, seasonSelected } = useSelector(selectTools)
  const { duration } = useSelector(selectApp)
  const answers = useSelector(selectAnswers)
  const user = useSelector(selectUser)
  const { admin, buddies } = user

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

  const row = (
    <div
      className={clsx(
        'gap-0.5 grid  min-h-[1.875rem]',
        showOneWeek
          ? 'grid-cols-[1.75rem,1.75rem,1fr,3.25rem,2.75rem] sm:grid-cols-[2rem,2rem,1fr,4rem,3rem]'
          : 'grid-cols-[1.75rem,1.75rem,1fr,3.25rem,2.75rem,2.75rem] sm:grid-cols-[2rem,2rem,1fr,4rem,3rem,3rem]',
        uid === user.uid ? 'bg-amber-400' : index % 2 === 1 && 'bg-gray-200'
      )}
    >
      {/* position */}
      <div className="flex items-center text-sm justify-center rounded-md px-1 py-0 border border-gray-400">
        {position}
      </div>
      {/* buddy */}
      <div
        className={clsx(
          'flex items-center text-sm justify-center rounded-md px-1 py-0 border border-gray-400',
          buddies?.includes(uid ?? '') ? 'text-yellow-600' : 'text-gray-500 text-opacity-50',
          seasonSelected !== 2022 && 'pointer'
        )}
        onClick={() => seasonSelected !== 2022 && uid && handleAddRemoveBuddy(uid)}
      >
        <FaStar />
      </div>
      {/* name */}
      <div
        className={clsx(
          'flex items-center text-sm justify-start leading-4 rounded-md py-0 grow border border-gray-400 tracking-tighter px-1 sm:px-2',
          seasonSelected !== 2022 && 'pointer'
        )}
        onClick={() => uid && handleClickOnUser(name, uid)}
        style={{ fontWeight: user.uid === uid ? 600 : '' }}
      >
        {name}
      </div>
      {/* answers */}
      <div
        className={clsx(
          'flex items-center text-sm justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter',
          seasonSelected !== 2022 && 'pointer'
        )}
      >
        {userAnswers}
      </div>
      {/* percentage */}
      <div
        className={clsx(
          'flex items-center text-sm justify-center rounded-md px-1 py-0 border border-gray-400 tracking-tighter',
          seasonSelected !== 2022 && 'pointer'
        )}
      >
        {correctAdjusted}
      </div>
      {/* limit */}
      {showOneWeek ? null : (
        <div
          className={clsx(
            'flex items-center text-sm justify-center rounded-md px-1 py-0 border border-gray-400',
            seasonSelected !== 2022 && 'pointer'
          )}
        >
          {tableFaults}
        </div>
      )}
    </div>
  )

  const returnEmpty =
    !name.toLowerCase().includes(standingsSearch.toLowerCase()) || (showBuddies && !buddies?.includes(uid ?? ''))

  return returnEmpty ? null : row
}
