import {
  FaInfoCircle,
  FaUserAlt,
  FaFootballBall,
  FaCalendarAlt,
  FaClipboardList,
  FaChevronCircleRight,
  FaPenNib
} from 'react-icons/fa'

import { store } from '../redux/store'
import { LocaleType } from '../types'
import { i18n } from '../locale'

export const getMenu = (admin: boolean) => {
  const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg } = i18n(
    store.getState().user.locale,
    'header'
  ) as LocaleType

  const userMenu = [
    { path: '/', name: tab0msg, icon: <FaInfoCircle />, id: 0 },
    { path: '/userpage', name: tab1msg, icon: <FaUserAlt />, id: 1 },
    { path: '/week', name: tab2msg, icon: <FaFootballBall />, id: 2 },
    { path: '/season', name: tab3msg, icon: <FaCalendarAlt />, id: 3 },
    { path: '/standings', name: tab4msg, icon: <FaClipboardList />, id: 4 }
  ]

  const adminMenu = [
    { path: '/calendar', name: tab5msg, icon: <FaChevronCircleRight />, id: 5 },
    { path: '/editor', name: tab6msg, icon: <FaPenNib />, id: 6 }
  ]

  return admin ? [...userMenu, ...adminMenu] : userMenu
}
