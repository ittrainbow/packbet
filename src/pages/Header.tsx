import { useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  FaInfoCircle,
  FaUserAlt,
  FaFootballBall,
  FaCalendarAlt,
  FaListUl,
  FaChevronCircleRight,
  FaPenNib
} from 'react-icons/fa'

import { useAppContext } from '../context/Context'
import { i18n } from '../locale/locale'
import { emptyWeek } from '../helpers'
import { selectApp, selectUser } from '../redux/selectors'
import { LocaleType } from '../types'
import { appActions } from '../redux/slices'

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const app = useSelector(selectApp)
  const { mobile, tabActive, nextWeek, currentWeek, editor } = app
  const { setEditorContext } = useAppContext()
  const { admin, locale, name } = useSelector(selectUser)

  const headerLocale = i18n(locale, 'header') as LocaleType
  const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg } = headerLocale

  const userMenu = [
    { path: '/', name: tab0msg, icon: <FaInfoCircle />, id: 0 },
    { path: '/userpage', name: tab1msg, icon: <FaUserAlt />, id: 1 },
    { path: '/week', name: tab2msg, icon: <FaFootballBall />, id: 2 },
    { path: '/season', name: tab3msg, icon: <FaCalendarAlt />, id: 3 },
    { path: '/standings', name: tab4msg, icon: <FaListUl />, id: 4 }
  ]

  const adminMenu = [
    { path: '/calendar', name: tab5msg, icon: <FaChevronCircleRight />, id: 5 },
    { path: '/editor', name: tab6msg, icon: <FaPenNib />, id: 6 }
  ]

  useEffect(() => {
    navigate('/userpage')
    // eslint-disable-next-line
  }, [])

  const clickHandler = (id: number, path: string) => {
    const selectedWeek = id === 2 ? currentWeek : id === 6 ? nextWeek : app.selectedWeek
    const emptyEditor = id === 6 ? true : false

    // id === 2 && dispatch(appActions.setSelectedWeek(selectedWeek))

    id === 5 && !editor && dispatch(appActions.setEditor(true))
    id === 3 && editor && dispatch(appActions.setEditor(false))

    if (currentWeek || currentWeek === 0 || id !== 2) {
      dispatch(appActions.setHeader({ id, selectedWeek, emptyEditor }))
      navigate(path)
    }

    if (id === 6) {
      dispatch(appActions.setEmptyEditor(emptyEditor))
      setEditorContext(emptyWeek)
    }
  }

  const getClass = (id: number) => {
    return id === 1 && !name
      ? 'header__no-login'
      : id === tabActive
      ? 'header__tab-active'
      : 'header__tab'
  }

  const bar = admin ? [...userMenu, ...adminMenu] : userMenu

  return (
    <div className="header">
      <div className="header__icons">
        {bar.map((el) => {
          const { id, path, icon, name } = el
          return (
            <div key={id} className={getClass(id)} onClick={() => clickHandler(id, path)}>
              <div className="header__icon-padding">{icon}</div>
              <div className="header__message">{mobile ? null : name}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const MemoHeader = memo(Header)
