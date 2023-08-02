import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'

import { selectStandings, selectUser } from '../redux/selectors'
import { auth } from '../db'
import { i18n } from '../locale'
import { OtherUser } from '../UI'
import { LocaleType } from '../types'
import { appActions } from '../redux/slices'
import { FETCH_OTHER_USER } from '../redux/storetypes'
import { Button, Input } from '../UI'
import { useVisibility } from '../hooks/useVisibility'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user] = useAuthState(auth)
  const standings = useSelector(selectStandings)
  const { locale } = useSelector(selectUser)
  const buttonRef = useRef<HTMLDivElement>(null)
  const myRef = useRef<HTMLDivElement>(null)
  const [showGoBackButton, setShowGoBackButton] = useState<boolean>(false)
  const [searchString, setSearchString] = useState<string>('')
  const [searchClass, setSearchClass] = useState<string>('')

  const isButtonInViewport = useVisibility(buttonRef)
  const isMyRefInViewport = useVisibility(myRef)

  useEffect(() => {
    setTimeout(() => setShowGoBackButton(!isButtonInViewport), 500)
  }, [isButtonInViewport])

  const clickHandler = (otherUserUID: string, otherUserName: string) => {
    if (user && otherUserUID !== user.uid) {
      const otherUser = { otherUserName, otherUserUID, tabActive: 3, isItYou: false }
      dispatch(appActions.setOtherUserFromStandings(otherUser))
      dispatch({ type: FETCH_OTHER_USER, payload: otherUserUID })
      navigate('/season')
    }
  }

  const { tableNameMsg, tableCorrectMsg, tableTierline, findMeBtn, findBtn, clearBtn } = i18n(
    locale,
    'standings'
  ) as LocaleType

  const findHandler = () => {
    const link = searchString.length > 0 ? searchString : 'findMyDivInStandings'
    const anchor = document.getElementById(link)
    if (anchor) {
      const y = anchor?.getBoundingClientRect().top - 100
      window.scrollTo({ top: y, behavior: 'smooth' })
    } else {
      setSearchClass('animate-draw-red')
      setTimeout(() => setSearchClass(''), 500)
    }
  }

  const clearHandler = () => {
    setSearchString('')
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchString(value.trim())
  }

  const scrollHandler = (direction: string) => {
    window.scrollTo({ top: direction === 'top' ? 0 : document.body.scrollHeight, behavior: 'smooth' })
  }

  const backClasses = `${!isButtonInViewport ? 'animate-show-button' : 'animate-hide-button'}`

  const cellTwoClass = (name: string, uid: string) => {
    return `cellTwo ${
      name === searchString || (user?.uid === uid && !searchString.length) ? 'cellTwo__bold' : 'cellTwo__regular'
    }`
  }

  return (
    <div className="container">
      <div className="standings-top-container">
        <Input onChange={onChangeHandler} value={searchString} className={searchClass} type="text" />
        <div ref={buttonRef} className="standings-button">
          <Button onClick={findHandler} minWidth={80} disabled={isMyRefInViewport && !searchString}>
            {searchString ? findBtn : findMeBtn}
          </Button>
        </div>
        <div ref={buttonRef} className="standings-button">
          <Button onClick={clearHandler} minWidth={80} disabled={!searchString}>
            {clearBtn}
          </Button>
        </div>
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
          <div className="cellOne">#</div>
          <div className="cellTwo">{tableNameMsg}</div>
          <div className="cellThree">%</div>
          <div className="cellFour">{tableCorrectMsg}</div>
          <div className="cellThree">90%</div>
        </div>
        {standings &&
          Object.values(standings)
            .filter((el) => el.ansTotal > 0)
            .map((el, index) => {
              const { name, uid, ansCorrect, ansTotal, position, resultsTotal } = el
              return (
                <div key={index} className="standings-header">
                  <div className="cellOne">{position}</div>
                  <div
                    className={cellTwoClass(name, uid)}
                    onClick={() => clickHandler(uid, name)}
                    id={uid === user?.uid ? 'findMyDivInStandings' : name}
                    ref={uid === user?.uid ? myRef : null}
                  >
                    {name}
                  </div>
                  <div className="cellThree">{ansCorrect + '/' + ansTotal}</div>
                  <div className="cellFour">{(ansCorrect / ansTotal).toFixed(3)}</div>
                  <div className="cellThree">{((ansTotal * 100) / resultsTotal).toFixed(0)}%</div>
                </div>
              )
            })}
        <div className="tierline">{tableTierline}</div>
      </div>
    </div>
  )
}
