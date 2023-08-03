import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaArrowCircleUp, FaArrowCircleDown } from 'react-icons/fa'

import { selectStandings, selectUser } from '../redux/selectors'
import { i18n } from '../locale'
import { OtherUser } from '../UI'
import { LocaleType } from '../types'
import { appActions } from '../redux/slices'
import { FETCH_OTHER_USER } from '../redux/storetypes'
import { Button, Input } from '../UI'
import { useRefVisibility } from '../hooks/useVisibility'
import { tableHelper } from '../helpers'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const standings = useSelector(selectStandings)
  const { uid } = useSelector(selectUser)
  const { locale } = useSelector(selectUser)
  const buttonRef = useRef<HTMLDivElement>(null)
  const [showGoBackButton, setShowGoBackButton] = useState<boolean>(false)
  const [searchString, setSearchString] = useState<string>('')
  const [searchClass, setSearchClass] = useState<string>('')

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

  const { tableNameMsg, tableCorrectMsg, findMeBtn, findBtn, clearBtn } = i18n(locale, 'standings') as LocaleType
  // const { tableTierline } = i18n(locale, 'standings') as LocaleType

  const findHandler = () => {
    const link = searchString.length > 0 ? searchString : 'findMyDivInStandings'
    const anchor = document.getElementById(link)
    if (anchor) {
      const y = anchor?.getBoundingClientRect().top - window.innerHeight / 2
      window.scrollTo({ top: y, behavior: 'smooth' })
      setTimeout(() => anchor.classList.add('animate-find-dark'), 200)
      setTimeout(() => anchor.classList.remove('animate-find-dark'), 1700)
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
    setSearchString(value)
  }

  const scrollHandler = (direction: string) => {
    window.scrollTo({ top: direction === 'top' ? 0 : document.body.scrollHeight, behavior: 'smooth' })
  }

  const backClasses = `${!isButtonInViewport ? 'animate-show-button' : 'animate-hide-button'}`

  const cellTwoClass = (name: string, elUid: string) => {
    return `col-two ${name === searchString || (elUid === uid && !searchString.length) ? 'col-two__bold' : ''}`
  }

  return (
    <div className="container">
      <div className="standings-top-container">
        <Input onChange={onChangeHandler} value={searchString} className={searchClass} type="text" />
        <div ref={buttonRef} className="standings-button">
          <Button onClick={findHandler} minWidth={80}>
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
          <div className="col-one">#</div>
          <div className="col-two">{tableNameMsg}</div>
          <div className="col-three">%</div>
          <div className="col-four">{tableCorrectMsg}</div>
          <div className="col-three">90%</div>
        </div>
        {standings &&
          Object.values(standings)
            // .filter((el) => el.ansTotal > 0)
            .map((el, index) => {
              const { name, answers, correct, ninety, position } = tableHelper(el)
              return (
                <div key={index} className="standings-header">
                  <div className="col-one">{position}</div>
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
        {/* <div className="tierline">{tableTierline}</div> */}
      </div>
    </div>
  )
}
