import { useSelector } from 'react-redux'
import * as icons from 'react-icons/fa'

import { selectUser } from '../redux/selectors'
import { i18n, LocaleType } from '../locale'

export const useMenu = () => {
  const { locale, admin } = useSelector(selectUser)
  const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg } = i18n(locale, 'header') as LocaleType

  const userMenu = [
    { path: '/', name: tab0msg, icon: <icons.FaInfoCircle />, id: 0 },
    { path: '/userpage', name: tab1msg, icon: <icons.FaUserAlt />, id: 1 },
    { path: '/week', name: tab2msg, icon: <icons.FaFootballBall />, id: 2 },
    { path: '/season', name: tab3msg, icon: <icons.FaCalendarAlt />, id: 3 },
    { path: '/standings', name: tab4msg, icon: <icons.FaClipboardList />, id: 4 }
  ]

  const adminMenu = [
    { path: '/calendar', name: tab5msg, icon: <icons.FaChevronCircleRight />, id: 5 },
    { path: '/editor', name: tab6msg, icon: <icons.FaPenNib />, id: 6 }
  ]

  return admin ? [...userMenu, ...adminMenu] : userMenu
}
