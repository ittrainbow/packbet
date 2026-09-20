import { FaStar } from '@/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import clsx from 'clsx'
import { useTableRow } from '@/hooks'
import { i18n, Locale } from '@/locale'
import { selectAnswers, selectApp, selectTools, selectUser } from '@/redux/selectors'
import { appActions, userActions } from '@/redux/slices'
import { FETCH_OTHER_USER, SET_BUDDIES } from '@/redux/storetypes'
import { Button } from '@/ui'
import { standingsGridClass } from './standings-grid'

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
  const isMe = getRow?.uid === user.uid
  const canExpand = seasonSelected === season
  const cell = 'flex items-center text-sm sm:text-base min-w-0'

  const row = (
    <div className="grid gap-1">
      <div
        className={clsx(
          standingsGridClass(seasonSelected),
          'rounded-lg border border-ink/20',
          isMe ? 'bg-gold font-semibold' : index % 2 === 1 && 'bg-white',
          canExpand && 'cursor-pointer'
        )}
        onClick={() => canExpand && setSelectedRow(selectedRow === index ? null : index)}
      >
        <span className={clsx(cell, 'justify-center')}>{getRow?.position}</span>

        {seasonSelected !== 2022 && (
          <button
            type="button"
            className={clsx(
              cell,
              'justify-center',
              buddies?.includes(getRow?.uid ?? '') ? 'text-gold' : 'text-ink-muted'
            )}
            onClick={(e) => {
              e.stopPropagation()
              seasonSelected !== 2022 && getRow?.uid && handleAddRemoveBuddy(getRow.uid)
            }}
          >
            <FaStar />
          </button>
        )}

        <span className={clsx(cell, 'text-start leading-4 tracking-tighter px-1')}>
          <span className="truncate">{getRow?.name}</span>
        </span>

        <span className={clsx(cell, 'justify-center tracking-tighter')}>{getRow?.userAnswers}</span>
        <span className={clsx(cell, 'justify-center tracking-tighter')}>{getRow?.correctAdjusted}</span>
        <span className={clsx(cell, 'justify-center')}>
          {seasonSelected === 2022 ? getRow.adjustedPercentage : showOneWeek ? '-' : getRow?.tableFaults}
        </span>
      </div>
      {selectedRow === index && (
        <div className="min-h-12 grid p-2 bg-white rounded-xl border border-ink/20 overflow-hidden">
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
              size="sm"
            />
            <Button onClick={() => setSelectedRow(null)} text={tableDetailsCollapse} className="px-2" size="sm" />
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
