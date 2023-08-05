import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowCircleUp, FaArrowCircleDown, FaStar } from 'react-icons/fa'
import { BsGearFill } from 'react-icons/bs'

import { selectStandings, selectUser, selectWeeks } from '../redux/selectors'
import { i18n } from '../locale'
import { OtherUser, Switch } from '../UI'
import { LocaleType } from '../types'
import { appActions } from '../redux/slices'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../redux/storetypes'
import { Button, Input } from '../UI'
import { tableHelper } from '../helpers'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { season, week } = useSelector(selectStandings)
  const weeks = useSelector(selectWeeks)
  const user = useSelector(selectUser)
  const { locale } = useSelector(selectUser)
  const arrowsRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const standingsRef = useRef<HTMLDivElement>(null)
  const [searchString, setSearchString] = useState<string>('')
  const [onlyBuddies, setOnlyBuddies] = useState<boolean>(localStorage.getItem('packContestFavList') === 'true')
  const [oneWeekOnly, setOneWeekOnly] = useState<boolean>(localStorage.getItem('packContestOneWeek') === 'true')
  const [showTools, setShowTools] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const { uid, buddies } = user

  const standings = oneWeekOnly ? week : season

  useEffect(() => {
    let listener = () => {
      if (window.scrollY > 350 && !scrolled) {
        setScrolled(true)
        arrowsRef.current?.classList.add('arrows-show')
        arrowsRef.current?.classList.remove('arrows-hide')
      }
      if (window.scrollY < 350 && scrolled) {
        setScrolled(false)
        arrowsRef.current?.classList.remove('arrows-show')
        arrowsRef.current?.classList.add('arrows-hide')
      }
    }

    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
    // eslint-disable-next-line
  }, [window.onscroll, scrolled])

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
    tableHeaderhMsg
  } = i18n(locale, 'standings') as LocaleType

  const clearHandler = () => {
    setSearchString('')
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchString(value)
  }

  const scrollHandler = (direction: string) => {
    window.scrollTo({ top: direction === 'top' ? 0 : document.body.scrollHeight, behavior: 'smooth' })
  }

  const addRemoveBuddyHandler = (uid: string) => {
    dispatch({ type: SET_BUDDIES, payload: { user, buddyUid: uid, buddies } })
  }

  const spanSelectHandler = () => {
    const value = !oneWeekOnly
    localStorage.setItem('packContestOneWeek', value.toString())
    setOneWeekOnly(value)
  }

  const showToolsHandler = () => {
    toolsRef.current?.classList.remove('animate-fade-in')
    toolsRef.current?.classList.add('animate-fade-out')
    standingsRef.current?.classList.remove('animate-fade-in')
    standingsRef.current?.classList.add('animate-fade-out')

    setTimeout(() => {
      setShowTools(!showTools)
      toolsRef.current?.classList.remove('animate-fade-out')
      toolsRef.current?.classList.add('animate-fade-in')
      standingsRef.current?.classList.remove('animate-fade-out')
      standingsRef.current?.classList.add('animate-fade-in')
    }, 300)
  }

  const buddiesHandler = () => {
    const value = !onlyBuddies
    setOnlyBuddies(value)
    localStorage.setItem('packContestFavList', value.toString())
  }

  const getClass = (className: string, index: number) => `${className} + ${index % 2 === 0 ? ' dark' : ''}`
  const getGearClass = `standings-top-container__${showTools ? 'green' : 'grey'}`
  const getToolsClass = `tools-container__${showTools ? 'open' : 'close'}`

  const standingsRender = useMemo(() => {
    return Object.values(standings)
      .filter((el) => el.name.toLowerCase().includes(searchString.toLowerCase()))
      .filter((el) => {
        return onlyBuddies ? buddies.includes(el.uid) : el
      })
      .map((el, index) => {
        const { name, answers, correct, ninety, position, uid } = tableHelper(el)
        const buddy = buddies.includes(uid)
        return (
          <div key={index} className="standings-header">
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
  }, [onlyBuddies, oneWeekOnly])

  return (
    <div className="container">
      <div className="standings-top-container">
        <div className="standings-top-container__left">
          {tableHeaderhMsg}
          {Object.keys(weeks).length}
        </div>
        <div className={getGearClass}>
          <BsGearFill onClick={showToolsHandler} />
        </div>
      </div>
      {showTools ? (
        <div className={getToolsClass} ref={toolsRef}>
          <div className="standings-search">
            <Input onChange={onChangeHandler} value={searchString} type="text" />
            <div>
              <Button onClick={clearHandler} minWidth={80} disabled={!searchString}>
                {tableClearBtn}
              </Button>
            </div>
          </div>
          <div className="standings-tools">
            <Switch
              onChange={spanSelectHandler}
              checked={oneWeekOnly}
              messageOn={tableOnlyWeekMsg}
              messageOff={tableAllSeasonMsg}
            />
            <Switch
              onChange={buddiesHandler}
              checked={onlyBuddies}
              messageOn={tableBuddiesMsg}
              messageOff={tableAllUsersMsg}
            />
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="standings" ref={standingsRef}>
        <OtherUser />
        <div className="standings-header">
          <div className="col-zero">#</div>
          <div className="col-one"></div>
          <div className="col-two">{tableNameMsg}</div>
          <div className="col-three">%</div>
          <div className="col-four">{tableCorrectMsg}</div>
          <div className="col-three">90%</div>
        </div>
        {standingsRender}
        <div className="arrows-container arrows-hide" ref={arrowsRef}>
          <FaArrowCircleUp onClick={() => scrollHandler('top')} />
          <FaArrowCircleDown onClick={() => scrollHandler('bottom')} />
        </div>
        <div className="tierline">{tableTierline}</div>
      </div>
    </div>
  )
}
