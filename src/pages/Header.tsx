import { useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
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
import { setTabActive } from '../helpers/tabActive'
import { selectApp } from '../redux/selectors'
import { IAppContext, LocaleType } from '../types'

export const Header = () => {
  const { mobile } = useSelector(selectApp)
  const { appContext, setAppContext, userContext, setEditorContext } = useAppContext()
  const { admin, locale, name } = userContext
  const { tabActive, nextWeek, currentWeek } = appContext
  const navigate = useNavigate()

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
    const tabActive = id
    const selectedWeek = id === 2 ? currentWeek : id === 6 ? nextWeek : appContext.selectedWeek
    const emptyEditor = id === 6 ? true : false

    const context: IAppContext = {
      ...appContext,
      tabActive,
      selectedWeek,
      emptyEditor
    }

    if (currentWeek || currentWeek === 0 || id !== 2) {
      setAppContext(context)
      setTabActive(id)
      navigate(path)
    }

    id === 6 && setEditorContext(emptyWeek)
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
