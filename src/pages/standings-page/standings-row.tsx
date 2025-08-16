import { FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { useTableRow } from '../../hooks'
import { i18n, Locale } from '../../locale'
import { selectAnswers, selectApp, selectTools, selectUser } from '../../redux/selectors'
import { appActions, userActions } from '../../redux/slices'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../../redux/storetypes'
import { Button } from '../../ui'

type Props = {
  index: number
  fade: () => void
  selectedRow: number | null
  setSelectedRow: (selectedRow: number | null) => void
}

export const StandingsRow = ({ fade, index, selectedRow, setSelectedRow }: Props) => {
  const { locale } = useSelector(selectUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showBuddies, standingsSearch, showOneWeek, seasonSelected } = useSelector(selectTools)
  const { duration, season } = useSelector(selectApp)
  const answers = useSelector(selectAnswers)
  const user = useSelector(selectUser)
  const { admin, buddies } = user

  const {
    tableDetailsAnswersButton,
    tableDetailsCollapse,
    tableDetailsResults,
    tableDetailsCorrect,
    tableDetailsAnswers,
    tableDetailsSkipped,
    tableDetailsLimit,
    tableDetailsAdjusted
  } = i18n(locale, 'standings') as Locale

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
      }, duration - 33)
    }
  }

  const handleAddRemoveBuddy = (uid: string) => {
    !!user.name.length && dispatch({ type: SET_BUDDIES, payload: { buddyUid: uid, buddies } })
  }

  const getRow = useTableRow(index)

  const row = (
    <div className="grid gap-1">
      <div
        className={clsx(
          'gap-0.5 grid  min-h-[1.875rem]',
          seasonSelected === 2022
            ? 'grid-cols-[1.75rem,1fr,3.25rem,2.75rem,2.75rem] sm:grid-cols-[2rem,1fr,4rem,3.5rem,3.5rem]'
            : 'grid-cols-[1.75rem,1.75rem,1fr,3.25rem,2.75rem,2.75rem] sm:grid-cols-[2rem,2rem,1fr,4rem,3.5rem,3.5rem]'
        )}
      >
        <span
          className={clsx(
            'flex items-center text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-gray-400',
            getRow?.uid === user.uid ? 'bg-amber-400' : index % 2 === 1 && 'bg-gray-200'
          )}
        >
          {getRow?.position}
        </span>

        {seasonSelected !== 2022 && (
          <button
            className={clsx(
              'flex items-center text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-gray-400',
              buddies?.includes(getRow?.uid ?? '') ? 'text-yellow-600' : 'text-gray-500 text-opacity-50',
              getRow?.uid === user.uid ? 'bg-amber-400' : index % 2 === 1 && 'bg-gray-200'
            )}
            onClick={() => seasonSelected !== 2022 && getRow?.uid && handleAddRemoveBuddy(getRow?.uid)}
          >
            <FaStar />
          </button>
        )}

        <button
          className={clsx(
            'flex items-center text-sm sm:text-base text-start leading-4 rounded-lg py-0.5 grow border border-gray-400 tracking-tighter px-1 sm:px-2',
            getRow?.uid === user.uid ? 'bg-amber-400' : index % 2 === 1 && 'bg-gray-200',
            seasonSelected === 2022 && 'cursor-auto'
          )}
          onClick={() => {
            // if (selectedRow !== null) {
            //   setSelectedRow(null)
            //   setTimeout(() => setSelectedRow(selectedRow === index ? null : index), duration * 2)
            //   return
            // }
            setSelectedRow(selectedRow === index ? null : index)
          }}
          style={{ fontWeight: user.uid === getRow?.uid ? 600 : '' }}
          disabled={seasonSelected !== season}
        >
          {window.innerWidth < 480 && getRow?.name.length > 20
            ? getRow?.name?.replace(/#/g, '# ').replace(/_/g, '_ ').replace(/-/g, '- ')
            : getRow?.name}
        </button>

        <span
          className={clsx(
            'flex items-center text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-gray-400 tracking-tighter',
            getRow?.uid === user.uid ? 'bg-amber-400' : index % 2 === 1 && 'bg-gray-200',
            seasonSelected !== 2022 && 'pointer'
          )}
        >
          {getRow?.userAnswers}
        </span>

        <span
          className={clsx(
            'flex items-center text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-gray-400 tracking-tighter',
            getRow?.uid === user.uid ? 'bg-amber-400' : index % 2 === 1 && 'bg-gray-200',
            seasonSelected !== 2022 && 'pointer'
          )}
        >
          {getRow?.correctAdjusted}
        </span>

        <span
          className={clsx(
            'flex items-center text-sm sm:text-base justify-center rounded-lg px-1 py-0 border border-gray-400',
            getRow?.uid === user.uid ? 'bg-amber-400' : index % 2 === 1 && 'bg-gray-200',
            seasonSelected !== 2022 && 'pointer'
          )}
        >
          {seasonSelected === 2022 ? getRow.adjustedPercentage : showOneWeek ? '-' : getRow?.tableFaults}
        </span>
      </div>
      {selectedRow === index && (
        <div className={clsx('min-h-12 grid p-2 bg-gray-200 rounded-lg border border-gray-400 overflow-hidden')}>
          <span className="text-sm font-bold pb-2">
            {tableDetailsResults}: {getRow.userAnswers}
          </span>
          <span className="text-sm">
            {tableDetailsCorrect}: {getRow.ansCorrect}
          </span>
          <span className="text-sm">
            {tableDetailsAnswers}: {getRow.ansTotal}
          </span>
          <span className="text-sm">
            {tableDetailsSkipped}: {(getRow.resultsTotal ?? 0) - (getRow.ansTotal ?? 0)}
          </span>
          <span className="text-sm">
            {tableDetailsAdjusted}: {getRow.answersAdjusted}
          </span>
          <span className="text-sm">
            {tableDetailsLimit}: {getRow.tableFaults}
          </span>
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Button
              onClick={() => getRow.uid && handleClickOnUser(getRow?.name, getRow.uid)}
              text={tableDetailsAnswersButton}
              disabled={getRow.uid === user.uid}
            />
            <Button onClick={() => setSelectedRow(null)} text={tableDetailsCollapse} className="px-2" />
          </div>
        </div>
      )}
    </div>
  )

  const returnEmpty =
    !getRow?.name.toLowerCase().includes(standingsSearch.toLowerCase()) ||
    (showBuddies && !buddies?.includes(getRow?.uid ?? ''))

  return returnEmpty ? null : row
}
