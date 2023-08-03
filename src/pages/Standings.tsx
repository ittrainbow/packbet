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
  const standings = useSelector(selectStandings)
  const user = useSelector(selectUser)
  const { locale } = useSelector(selectUser)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [showGoBackButton, setShowGoBackButton] = useState<boolean>(false)
  const [searchString, setSearchString] = useState<string>('')
  const [onlyBuddies, setOnlyBuddies] = useState<boolean>(localStorage.getItem('packContestFavList') === 'true')
  const [oneWeekOnly, setOneWeekOnly] = useState<boolean>(false)
  const { uid, buddies } = user

  const isButtonInViewport = useRefVisibility(buttonRef)

  useEffect(() => {
    setTimeout(() => setShowGoBackButton(!isButtonInViewport), 500)
  }, [isButtonInViewport])

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

  const cellTwoClass = (name: string, elUid: string) => {
    return `col-two ${name === searchString || (elUid === uid && !searchString.length) ? 'col-two__bold' : ''}`
  }

  const buddyHandler = (uid: string) => {
    dispatch({ type: SET_BUDDIES, payload: { user, buddyUid: uid, buddies } })
  }

  const spanSelectHandler = () => {
    setOneWeekOnly(!oneWeekOnly)
  }

  const onlyBuddiesHandler = () => {
    const value = !onlyBuddies
    console.log('onlybuddies')
    setOnlyBuddies(value)
    localStorage.setItem('packContestFavList', value.toString())
  }

  return (
    <div className="container">
      <div className="standings-top-container">
        <div className="standings-search">
          <Input onChange={onChangeHandler} value={searchString} type="text" />
          <div ref={buttonRef}>
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
          <div className="col-one">Fav</div>
          <div className="col-two">{tableNameMsg}</div>
          <div className="col-three">%</div>
          <div className="col-four">{tableCorrectMsg}</div>
          <div className="col-three">90%</div>
        </div>
        {standings &&
          Object.values(standings)
            // .filter((el) => el.ansTotal > 0)
            .filter((el) => el.name.includes(searchString))
            .filter((el) => {
              return onlyBuddies ? buddies.includes(el.uid) : el
            })
            .map((el, index) => {
              const { name, answers, correct, ninety, position, uid } = tableHelper(el)
              const buddy = buddies.includes(uid)
              return (
                <div key={index} className="standings-header">
                  <div className="col-zero">{position}</div>
                  <div
                    className="col-one"
                    style={{ color: buddy ? 'darkgoldenrod' : 'lightgrey' }}
                    onClick={() => buddyHandler(uid)}
                  >
                    <FaStar />
                  </div>
                  <div
                    className={cellTwoClass(name, el.uid)}
                    onClick={() => clickHandler(name, el.uid)}
                    id={uid === el.uid ? 'findMyDivInStandings' : name}
                  >
                    {name}
                  </div>
                  <div className="col-three">{answers}</div>
                  <div className="col-four">{correct}</div>
                  <div className="col-five">{ninety}</div>
                </div>
              )
            })}
        <div className="tierline">{tableTierline}</div>
      </div>
    </div>
  )
}
