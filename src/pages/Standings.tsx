import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsGearFill } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'

import { selectApp, selectStandings, selectTools } from '../redux/selectors'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../redux/storetypes'
import { OtherUser, Arrows, Tools } from '../UI'
import { appActions, toolsActions } from '../redux/slices'
import { fadeOut, tableHelper } from '../helpers'
import { IStore, LocaleType } from '../types'
import { i18n } from '../locale'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [fadeOutTools, setFadeOutTools] = useState<boolean>(false)
  const { tabActive } = useSelector(selectApp)
  const { season, week } = useSelector(selectStandings)
  const { showTools, showBuddies, showOneWeek, standingsSearch } = useSelector(selectTools)
  const results = useSelector((store: IStore) => store.results)
  const user = useSelector((store: IStore) => store.user)
  const weeks = useSelector((store: IStore) => store.weeks)
  const { locale, uid, buddies } = user
  const containerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  // container fade animations

  useEffect(() => {
    tabActive !== 4 && fadeOut(containerRef, 'standings')
  }, [tabActive])

  // click action handlers

  const handleSwitchTools = () => {
    setFadeOutTools(!fadeOutTools)
    fadeOut(tableRef, 'standings')
    setTimeout(() => dispatch(toolsActions.switchShowTools()), 200)
  }

  const handleClickOnUser = (otherUserName: string, otherUserUID: string) => {
    if (uid && otherUserUID !== uid) {
      fadeOut(containerRef, 'standings')
      setTimeout(() => {
        const otherUser = { otherUserName, otherUserUID, tabActive: 3, isItYou: false }
        dispatch(appActions.setOtherUserFromStandings(otherUser))
        dispatch({ type: FETCH_OTHER_USER, payload: otherUserUID })
        navigate('/season')
      }, 200)
    }
  }

  const handleAddRemoveBuddy = (uid: string) => {
    !!user.name.length && dispatch({ type: SET_BUDDIES, payload: { buddyUid: uid, buddies } })
  }

  // render styles and locales

  const getGearClass = `standings-top-container__${showTools ? 'gear-on' : 'gear-off'}`

  const getCellClass = (className: string, index: number) => `${className} ${index % 2 === 0 ? 'standings__dark' : ''}`

  const { tableNameMsg, tableCorrectMsg, tableTierline, tableOtherUserTierline, tableHeaderhMsg, tableNoGamesMsg } =
    i18n(locale, 'standings') as LocaleType

  const getLastWeekName = () => {
    const lastWeekNumber = Number(Object.keys(results).slice(-1)[0])
    const lastWeekName = !isNaN(lastWeekNumber) && weeks[lastWeekNumber].name.split('.')[1]
    return lastWeekName ? tableHeaderhMsg + lastWeekName : tableNoGamesMsg
  }

  // render

  return (
    <>
      <div className="container animate-fade-in-up" ref={containerRef}>
        <div className="standings-top-container">
          <div className="standings-top-container__title">{getLastWeekName()}</div>
          <div className={getGearClass}>
            <BsGearFill onClick={handleSwitchTools} />
          </div>
        </div>
        {showTools ? <Tools fadeOutTools={fadeOutTools} /> : null}
        <div className="standings" ref={tableRef}>
          <OtherUser containerRef={containerRef} />
          <div className="standings__header">
            <div className="col-zero">#</div>
            <div className="col-one"></div>
            <div className="col-two">{tableNameMsg}</div>
            <div className="col-three">%</div>
            <div className="col-four">{tableCorrectMsg}</div>
            <div className="col-five">90%</div>
          </div>
          {Object.values(showOneWeek ? week : season)
            .filter((el) => el.name.toLowerCase().includes(standingsSearch.toLowerCase()))
            .filter((el) => {
              return showBuddies ? buddies.includes(el.uid) : el
            })
            .map((el, index) => {
              const { name, answers, correct, ninety, position, uid } = tableHelper(el)
              const buddy = buddies?.includes(uid)
              return (
                <div key={index} className="standings__header">
                  <div className={getCellClass('col-zero', index)}>{position}</div>
                  <div
                    className={getCellClass('col-one', index)}
                    style={{ color: buddy ? 'darkgoldenrod' : '#c7c7c7' }}
                    onClick={() => handleAddRemoveBuddy(uid)}
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
          <div className="tierline">{tableTierline}</div>
          <div className="tierline">{tableOtherUserTierline}</div>
        </div>
      </div>
      <Arrows />
    </>
  )
}
