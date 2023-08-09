import { useRef, useState, useEffect, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BsGearFill } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { Input } from '@mui/material'

import { fadeOut, fadeInTools, fadeOutTools, tableHelper } from '../helpers'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../redux/storetypes'
import { selectApp, selectStandings } from '../redux/selectors'
import { OtherUser, Switch, Arrows } from '../UI'
import { IStore, LocaleType } from '../types'
import { appActions } from '../redux/slices'
import { Button } from '../UI'
import { i18n } from '../locale'

const initialBuddies = localStorage.getItem('packContestFavList') === 'true'
const initialTimeSpan = localStorage.getItem('packContestOneWeek') === 'true'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mobile, tabActive } = useSelector(selectApp)
  const { season, week } = useSelector(selectStandings)
  const results = useSelector((store: IStore) => store.results)
  const user = useSelector((store: IStore) => store.user)
  const weeks = useSelector((store: IStore) => store.weeks)
  const { locale, uid, buddies } = user
  const containerRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [searchString, setSearchString] = useState<string>('')
  const [onlyBuddies, setOnlyBuddies] = useState<boolean>(initialBuddies)
  const [oneWeekOnly, setOneWeekOnly] = useState<boolean>(initialTimeSpan)
  const [showTools, setShowTools] = useState<boolean>(false)

  useEffect(() => {
    tabActive !== 4 && fadeOut(containerRef, 'standings')
  }, [tabActive])

  const clickHandler = (otherUserName: string, otherUserUID: string) => {
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

  const msg = i18n(locale, 'standings') as LocaleType

  const clearHandler = () => setSearchString('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)

  const addRemoveBuddyHandler = (uid: string) =>
    !!user.name.length && dispatch({ type: SET_BUDDIES, payload: { buddyUid: uid, buddies } })

  const spanSelectHandler = () => {
    const value = !oneWeekOnly
    localStorage.setItem('packContestOneWeek', value.toString())
    setOneWeekOnly(value)
  }

  const showToolsHandler = () => {
    fadeOutTools(tableRef, toolsRef)
    setTimeout(() => {
      setShowTools(!showTools)
      fadeInTools(tableRef)
    }, 200)
  }

  const buddiesHandler = () => {
    const value = !onlyBuddies
    setOnlyBuddies(value)
    localStorage.setItem('packContestFavList', value.toString())
  }

  const getLastWeekName = () => {
    const lastWeekNumber = Number(Object.keys(results).slice(-1)[0])
    const lastWeekName = !isNaN(lastWeekNumber) && weeks[lastWeekNumber].name.split('.')[1]
    return lastWeekName ? msg.tableHeaderhMsg + lastWeekName : msg.tableNoGamesMsg
  }

  const getGearClass = `standings-top-container__${showTools ? 'gear-on' : 'gear-off'}`

  const getCellClass = (className: string, index: number) => {
    return `${className} ${index % 2 === 0 ? 'standings__dark' : ''}`
  }

  return (
    <>
      <div className="container animate-fade-in-up" ref={containerRef}>
        <div className="standings-top-container">
          <div className="standings-top-container__title">{getLastWeekName()}</div>
          <div className={getGearClass}>
            <BsGearFill onClick={showToolsHandler} />
          </div>
        </div>
        {showTools ? (
          <div className="standings__tools animate-fade-in-up" ref={toolsRef}>
            <div className="standings__search">
              <Input
                onChange={onChangeHandler}
                value={searchString}
                type="text"
                placeholder={msg.tableSearchMsg}
                sx={{ width: '100%', padding: 0.25 }}
              />
              <div>
                <Button onClick={clearHandler} minWidth={80} disabled={!searchString}>
                  {msg.tableClearBtn}
                </Button>
              </div>
            </div>
            <div className="standings__switchers" style={{ flexDirection: mobile ? 'column' : 'row' }}>
              <Switch
                onChange={spanSelectHandler}
                checked={oneWeekOnly}
                messageOn={msg.tableOnlyWeekMsg}
                messageOff={msg.tableAllSeasonMsg}
                fullWidth={true}
              />
              <Switch
                onChange={buddiesHandler}
                checked={onlyBuddies}
                messageOn={msg.tableBuddiesMsg}
                messageOff={msg.tableAllUsersMsg}
                fullWidth={true}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="standings" ref={tableRef}>
          <OtherUser containerRef={containerRef} />
          <div className="standings__header">
            <div className="col-zero">#</div>
            <div className="col-one"></div>
            <div className="col-two">{msg.tableNameMsg}</div>
            <div className="col-three">%</div>
            <div className="col-four">{msg.tableCorrectMsg}</div>
            <div className="col-five">90%</div>
          </div>
          {Object.values(oneWeekOnly ? week : season)
            .filter((el) => el.name.toLowerCase().includes(searchString.toLowerCase()))
            .filter((el) => {
              return onlyBuddies ? buddies.includes(el.uid) : el
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
                    onClick={() => addRemoveBuddyHandler(uid)}
                  >
                    <FaStar />
                  </div>
                  <div
                    className={getCellClass('col-two', index)}
                    onClick={() => clickHandler(name, el.uid)}
                    style={{ fontWeight: user.uid === uid ? 600 : '' }}
                  >
                    {user.uid === uid ? user.name : name}
                  </div>
                  <div className={getCellClass('col-three', index)}>{answers}</div>
                  <div className={getCellClass('col-four', index)}>{correct}</div>
                  <div className={getCellClass('col-five', index)}>{oneWeekOnly ? '-' : ninety}</div>
                </div>
              )
            })}
          <div className="tierline">{msg.tableTierline}</div>
          <div className="tierline">{msg.tableOtherUserTierline}</div>
        </div>
      </div>
      <Arrows />
    </>
  )
}
