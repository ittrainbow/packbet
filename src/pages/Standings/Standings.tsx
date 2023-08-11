import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsGearFill } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'

import { selectApp, selectStandings, selectTools } from '../../redux/selectors'
import { appActions, toolsActions, userActions } from '../../redux/slices'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../../redux/storetypes'
import { StandingsTools, StandingsHeader, StandingsArrows } from '.'
import { animateFadeOut, getTableRowParams } from '../../helpers'
import { IStore, LocaleType } from '../../types'
import { OtherUser } from '../../UI'
import { i18n } from '../../locale'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { showTools, showBuddies, showOneWeek, standingsSearch } = useSelector(selectTools)
  const results = useSelector((store: IStore) => store.results)
  const weeks = useSelector((store: IStore) => store.weeks)
  const user = useSelector((store: IStore) => store.user)
  const { tabActive, duration } = useSelector(selectApp)
  const { season, week } = useSelector(selectStandings)
  const { locale, uid, buddies, admin } = user
  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [fadeOutTools, setFadeOutTools] = useState<boolean>(false)

  // container fade animations

  useEffect(() => {
    tabActive !== 4 && animateFadeOut(containerRef)
  }, [tabActive])

  // helpers

  useEffect(() => {
    dispatch(toolsActions.setShowTools(false)) 
    // eslint-disable-next-line
  }, [])

  // action handlers

  const handleSwitchTools = () => {
    setFadeOutTools(!fadeOutTools)
    animateFadeOut(tableRef)
    setTimeout(() => dispatch(toolsActions.switchShowTools()), duration)
  }

  const handleClickOnUser = (otherUserName: string, otherUserUID: string) => {
    if (uid && otherUserUID !== uid) {
      animateFadeOut(containerRef)
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

  // render styles and locales

  const getGearClass = `standings-top-container__${showTools ? 'gear-on' : 'gear-off'}`

  const getCellClass = (className: string, index: number) => `${className} ${index % 2 === 0 ? 'standings__dark' : ''}`

  const { tablePSOne, tablePSTwo, tableHeaderhMsg, tableNoGamesMsg } = i18n(locale, 'standings') as LocaleType

  const getLastWeekName = () => {
    const lastWeekNumber = Number(Object.keys(results).slice(-1)[0])
    const lastWeekName = !isNaN(lastWeekNumber) && weeks[lastWeekNumber].name.split('.')[1]
    return lastWeekName ? tableHeaderhMsg + lastWeekName : tableNoGamesMsg
  }

  return (
    <>
      <div className="container animate-fade-in-up" ref={containerRef}>
        <div className="standings-top-container">
          <div className="standings-top-container__title">{getLastWeekName()}</div>
          <BsGearFill onClick={handleSwitchTools} className={getGearClass} />
        </div>
        {showTools ? <StandingsTools fadeOutTools={fadeOutTools} tableRef={tableRef} /> : null}
        <div className="standings" ref={tableRef}>
          <OtherUser containerRef={containerRef} />
          <StandingsHeader />
          {Object.values(showOneWeek ? week : season)
            .filter((el) => el.name.toLowerCase().includes(standingsSearch.toLowerCase()))
            .filter((el) => {
              return showBuddies ? buddies.includes(el.uid) : el
            })
            .map((el, index) => {
              const { name, answers, correct, ninety, position, uid } = getTableRowParams(el)
              const buddy = buddies?.includes(uid)
              return (
                <div key={index} className="standings__header">
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
                    onClick={() => handleClickOnUser(name, el.uid)}
                    style={{ fontWeight: user.uid === uid ? 600 : '' }}
                  >
                    {user.uid === uid ? user.name : name}
                  </div>
                  <div className={getCellClass('col-three', index)}>{answers}</div>
                  <div className={getCellClass('col-four', index)}>{correct}</div>
                  <div className={getCellClass('col-five', index)}>{showOneWeek ? '-' : ninety}</div>
                </div>
              )
            })}
          <div className="tierline">{tablePSOne}</div>
          <div className="tierline">{tablePSTwo}</div>
        </div>
      </div>
      <StandingsArrows />
    </>
  )
}
