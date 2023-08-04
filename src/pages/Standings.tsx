import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowCircleUp, FaArrowCircleDown, FaStar } from 'react-icons/fa'

import { selectStandings, selectUser } from '../redux/selectors'
import { i18n } from '../locale'
import { OtherUser, Switch } from '../UI'
import { LocaleType } from '../types'
import { appActions } from '../redux/slices'
import { FETCH_OTHER_USER, SET_BUDDIES } from '../redux/storetypes'
import { Button, Input } from '../UI'
import { useRefVisibility } from '../hooks/useVisibility'
import { tableHelper } from '../helpers'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { season, week } = useSelector(selectStandings)
  const user = useSelector(selectUser)
  const { locale } = useSelector(selectUser)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [showGoBackButton, setShowGoBackButton] = useState<boolean>(false)
  const [searchString, setSearchString] = useState<string>('')
  const [onlyBuddies, setOnlyBuddies] = useState<boolean>(localStorage.getItem('packContestFavList') === 'true')
  const [oneWeekOnly, setOneWeekOnly] = useState<boolean>(false)
  const [justLoaded, setJustLoaded] = useState<boolean>(true)
  const { uid, buddies } = user

  const standings = oneWeekOnly ? week : season

  const isButtonInViewport = useRefVisibility(buttonRef)

  useEffect(() => {
    !justLoaded && setTimeout(() => setShowGoBackButton(!isButtonInViewport), 700)
    // eslint-disable-next-line
  }, [isButtonInViewport])

  useEffect(() => {
    setTimeout(() => setJustLoaded(false), 200)
  }, [])

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
    clearBtn,
    tableTierline,
    allUsersMsg,
    onlyBuddiesMsg,
    onlyWeekMsg,
    allSeasonMsg
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

  const backClasses = `${!isButtonInViewport ? 'animate-show-button' : 'animate-hide-button'}`

  const addRemoveBuddyHandler = (uid: string) => {
    dispatch({ type: SET_BUDDIES, payload: { user, buddyUid: uid, buddies } })
  }

  const spanSelectHandler = () => {
    setOneWeekOnly(!oneWeekOnly)
  }

  const onlyBuddiesHandler = () => {
    const value = !onlyBuddies
    setOnlyBuddies(value)
    localStorage.setItem('packContestFavList', value.toString())
  }

  const getClass = (className: string, index: number) => `${className} + ${index % 2 === 0 ? ' dark' : ''}`

  return (
    <div className="container">
      <div ref={buttonRef} className="standings-top-container">
        <div className="standings-search">
          <Input onChange={onChangeHandler} value={searchString} type="text" />
          <div>
            <Button onClick={clearHandler} minWidth={80} disabled={!searchString}>
              {clearBtn}
            </Button>
          </div>
        </div>
        <Switch onChange={spanSelectHandler} checked={oneWeekOnly} messageOn={onlyWeekMsg} messageOff={allSeasonMsg} />
        <Switch
          onChange={onlyBuddiesHandler}
          checked={onlyBuddies}
          messageOn={onlyBuddiesMsg}
          messageOff={allUsersMsg}
        />
      </div>
      {showGoBackButton ? (
        <div className="arrow-container">
          <div className={backClasses} style={{ opacity: !isButtonInViewport ? 0.5 : 0 }}>
            <FaArrowCircleUp onClick={() => scrollHandler('top')} />

            <div className={backClasses} style={{ opacity: !isButtonInViewport ? 0.5 : 0 }}>
              <FaArrowCircleDown onClick={() => scrollHandler('bottom')} />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div className="standings">
        <OtherUser />
        <div className="standings-header">
          <div className="col-zero">#</div>
          <div className="col-one"></div>
          <div className="col-two">{tableNameMsg}</div>
          <div className="col-three">%</div>
          <div className="col-four">{tableCorrectMsg}</div>
          <div className="col-three">90%</div>
        </div>
        {standings &&
          Object.values(standings)
            // .filter((el) => el.ansTotal > 0)
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
                    {name}
                  </div>
                  <div className={getClass('col-three', index)}>{answers}</div>
                  <div className={getClass('col-four', index)}>{correct}</div>
                  <div className={getClass('col-five', index)}>{ninety}</div>
                </div>
              )
            })}
        <div className="tierline">{tableTierline}</div>
      </div>
    </div>
  )
}
