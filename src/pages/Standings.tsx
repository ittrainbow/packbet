import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaStar } from 'react-icons/fa'
import { BsGearFill } from 'react-icons/bs'
import { Input } from '@mui/material'

import { selectApp, selectResults, selectStandings, selectUser, selectWeeks } from '../redux/selectors'
import { i18n } from '../locale'
import { OtherUser, Switch, Arrows } from '../UI'
import { LocaleType } from '../types'
import { appActions } from '../redux/slices'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../redux/storetypes'
import { Button } from '../UI'
import { fadeInOut, tableHelper } from '../helpers'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mobile, tabActive } = useSelector(selectApp)
  const { season, week } = useSelector(selectStandings)
  const results = useSelector(selectResults)
  const user = useSelector(selectUser)
  const weeks = useSelector(selectWeeks)
  const { locale } = user
  const containerRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [searchString, setSearchString] = useState<string>('')
  const [onlyBuddies, setOnlyBuddies] = useState<boolean>(localStorage.getItem('packContestFavList') === 'true')
  const [oneWeekOnly, setOneWeekOnly] = useState<boolean>(localStorage.getItem('packContestOneWeek') === 'true')
  const [showTools, setShowTools] = useState<boolean>(false)
  const { uid, buddies } = user

  const standings = oneWeekOnly ? week : season

  useEffect(() => {
    tabActive !== 4 && fadeInOut(containerRef)
  }, [tabActive])

  const clickHandler = (otherUserName: string, otherUserUID: string) => {
    if (uid && otherUserUID !== uid) {
      fadeInOut(containerRef)
      setTimeout(() => {
        const otherUser = { otherUserName, otherUserUID, tabActive: 3, isItYou: false }
        dispatch(appActions.setOtherUserFromStandings(otherUser))
        dispatch({ type: FETCH_OTHER_USER, payload: otherUserUID })
        navigate('/season')
      }, 200)
    }
  }

  const {
    tableNameMsg,
    tableCorrectMsg,
    tableClearBtn,
    tableTierline,
    tableAllUsersMsg,
    tableBuddiesMsg,
    tableOnlyWeekMsg,
    tableAllSeasonMsg,
    tableHeaderhMsg,
    tableSearchMsg,
    tableOtherUserTierline,
    tableNoGamesMsg
  } = i18n(locale, 'standings') as LocaleType

  const clearHandler = () => setSearchString('')

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setSearchString(e.target.value)

  const addRemoveBuddyHandler = (uid: string) =>
    user && dispatch({ type: SET_BUDDIES, payload: { user, buddyUid: uid, buddies } })

  const spanSelectHandler = () => {
    const value = !oneWeekOnly
    localStorage.setItem('packContestOneWeek', value.toString())
    setOneWeekOnly(value)
  }

  const showToolsHandler = () => {
    const tableList = tableRef.current?.classList
    const toolsList = toolsRef.current?.classList

    tableList?.add('animate-fade-out-down')
    toolsList?.add('animate-fade-out-down')
    setTimeout(() => {
      setShowTools(!showTools)
      tableList?.remove('animate-fade-out-down')
      tableList?.add('animate-fade-in-up')
    }, 200)
  }

  const buddiesHandler = () => {
    const value = !onlyBuddies
    setOnlyBuddies(value)
    localStorage.setItem('packContestFavList', value.toString())
  }

  const getClass = (className: string, index: number) => `${className} ${index % 2 === 0 ? 'standings__dark' : ''}`
  const getGearClass = `standings-top-container__${showTools ? 'gear-on' : 'gear-off'}`

  const standingsRender = () => {
    return Object.values(standings)
      .filter((el) => el.name.toLowerCase().includes(searchString.toLowerCase()))
      .filter((el) => {
        return onlyBuddies ? buddies.includes(el.uid) : el
      })
      .map((el, index) => {
        const { name, answers, correct, ninety, position, uid } = tableHelper(el)
        const buddy = buddies?.includes(uid)
        return (
          <div key={index} className="standings__header">
            <div className={getClass('col-zero', index)}>{position}</div>
            <div
              className={getClass('col-one', index)}
              style={{ color: buddy ? 'darkgoldenrod' : '#c7c7c7' }}
              onClick={() => addRemoveBuddyHandler(uid)}
            >
              <FaStar />
            </div>
            <div
              className={getClass('col-two', index)}
              onClick={() => clickHandler(name, el.uid)}
              style={{ fontWeight: user.uid === uid ? 600 : '' }}
            >
              {user.uid === uid ? user.name : name}
            </div>
            <div className={getClass('col-three', index)}>{answers}</div>
            <div className={getClass('col-four', index)}>{correct}</div>
            <div className={getClass('col-five', index)}>{oneWeekOnly ? '-' : ninety}</div>
          </div>
        )
      })
  }

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
                placeholder={tableSearchMsg}
                sx={{ width: '100%', padding: 0.25 }}
              />
              <div>
                <Button onClick={clearHandler} minWidth={80} disabled={!searchString}>
                  {tableClearBtn}
                </Button>
              </div>
            </div>
            <div className="standings__switchers" style={{ flexDirection: mobile ? 'column' : 'row' }}>
              <Switch
                onChange={spanSelectHandler}
                checked={oneWeekOnly}
                messageOn={tableOnlyWeekMsg}
                messageOff={tableAllSeasonMsg}
                fullWidth={true}
              />
              <Switch
                onChange={buddiesHandler}
                checked={onlyBuddies}
                messageOn={tableBuddiesMsg}
                messageOff={tableAllUsersMsg}
                fullWidth={true}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="standings" ref={tableRef}>
          <OtherUser />
          <div className="standings__header" style={{ fontWeight: 600 }}>
            <div className="col-zero">#</div>
            <div className="col-one"></div>
            <div className="col-two">{tableNameMsg}</div>
            <div className="col-three">%</div>
            <div className="col-four">{tableCorrectMsg}</div>
            <div className="col-five">90%</div>
          </div>
          {standingsRender()}
          <div className="tierline">{tableTierline}</div>
          <div className="tierline">{tableOtherUserTierline}</div>
        </div>
      </div>
      <Arrows />
    </>
  )
}
