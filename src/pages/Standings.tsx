import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaStar } from 'react-icons/fa'
import { BsGearFill } from 'react-icons/bs'

import { selectApp, selectResults, selectStandings, selectUser } from '../redux/selectors'
import { i18n } from '../locale'
import { OtherUser, Switch, Arrows } from '../UI'
import { LocaleType } from '../types'
import { appActions } from '../redux/slices'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../redux/storetypes'
import { Button, Input } from '../UI'
import { tableHelper } from '../helpers'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { mobile } = useSelector(selectApp)
  const { season, week } = useSelector(selectStandings)
  const results = useSelector(selectResults)
  const user = useSelector(selectUser)
  const { locale } = user
  const standingsRef = useRef<HTMLDivElement>(null)
  const [searchString, setSearchString] = useState<string>('')
  const [onlyBuddies, setOnlyBuddies] = useState<boolean>(localStorage.getItem('packContestFavList') === 'true')
  const [oneWeekOnly, setOneWeekOnly] = useState<boolean>(localStorage.getItem('packContestOneWeek') === 'true')
  const [showTools, setShowTools] = useState<boolean>(false)
  const { uid, buddies } = user

  const standings = oneWeekOnly ? week : season

  const clickHandler = (otherUserName: string, otherUserUID: string) => {
    if (uid && otherUserUID !== uid) {
      const otherUser = { otherUserName, otherUserUID, tabActive: 3, isItYou: false }
      dispatch(appActions.setOtherUserFromStandings(otherUser))
      dispatch({ type: FETCH_OTHER_USER, payload: otherUserUID })
      navigate('/season')
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
    tableOtherUserTierline
  } = i18n(locale, 'standings') as LocaleType

  const clearHandler = () => {
    setSearchString('')
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchString(value)
  }

  const addRemoveBuddyHandler = (uid: string) => {
    user && dispatch({ type: SET_BUDDIES, payload: { user, buddyUid: uid, buddies } })
  }

  const spanSelectHandler = () => {
    const value = !oneWeekOnly
    localStorage.setItem('packContestOneWeek', value.toString())
    setOneWeekOnly(value)
  }

  const showToolsHandler = () => {
    standingsRef.current?.classList.add('animate-fade-out')

    setTimeout(() => {
      setShowTools(!showTools)
      standingsRef.current?.classList.remove('animate-fade-out')
    }, 20)
  }

  const buddiesHandler = () => {
    const value = !onlyBuddies
    setOnlyBuddies(value)
    localStorage.setItem('packContestFavList', value.toString())
  }

  const getClass = (className: string, index: number) => `${className} ${index % 2 === 0 ? 'standings__dark' : ''}`
  const getGearClass = `standings-top-container__${showTools ? 'gear-on' : 'gear-off'}`
  const getToolsClass = `animate-fade-in-up standings__tools${mobile ? '-mobile' : ''}`

  const standingsRender = () => {
    return Object.values(standings)
      .filter((el) => el.name.toLowerCase().includes(searchString.toLowerCase()))
      .filter((el) => {
        return onlyBuddies ? buddies.includes(el.uid) : el
      })
      .map((el, index) => {
        const { name, answers, correct, ninety, position, uid } = tableHelper(el)
        const buddy = buddies.includes(uid)
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

  return (
    <div className="container">
      <div className="standings-top-container">
        <div className="standings-top-container__title">
          {tableHeaderhMsg}
          {Object.keys(results).length}
        </div>
        <div className={getGearClass}>
          <BsGearFill onClick={showToolsHandler} />
        </div>
      </div>
      {showTools ? (
        <div className={getToolsClass}>
          <div className="standings__search">
            <Input onChange={onChangeHandler} value={searchString} type="text" placeholder={tableSearchMsg} />
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
              bordered={!mobile}
            />
            <Switch
              onChange={buddiesHandler}
              checked={onlyBuddies}
              messageOn={tableBuddiesMsg}
              messageOff={tableAllUsersMsg}
              fullWidth={true}
              bordered={!mobile}
            />
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="standings animate-fade-in-up" ref={standingsRef}>
        <OtherUser />
        <div className="standings__header">
          <div className="col-zero">#</div>
          <div className="col-one"></div>
          <div className="col-two">{tableNameMsg}</div>
          <div className="col-three">%</div>
          <div className="col-four">{tableCorrectMsg}</div>
          <div className="col-five">90%</div>
        </div>
        <hr />
        {standingsRender()}
        <div className="tierline">{tableTierline}</div>
        <div className="tierline">{tableOtherUserTierline}</div>
        <Arrows />
      </div>
    </div>
  )
}
