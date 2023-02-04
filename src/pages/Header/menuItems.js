import {
  FaInfoCircle,
  FaUserAlt,
  FaFootballBall,
  FaCalendarAlt,
  FaListUl,
  FaChevronCircleRight,
  FaPenNib
} from 'react-icons/fa'

import { i18n } from '../../locale/locale'

const locale = 'ru'

const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg} = i18n(locale, 'header')

export const userMenu = [
  { path: '/', name: tab0msg, icon: <FaInfoCircle className="header__icon-padding"/>, id: 0 },
  { path: '/userpage', name: tab1msg, icon: <FaUserAlt className="header__icon-padding" />, id: 1 },
  { path: '/week', name: tab2msg, icon: <FaFootballBall className="header__icon-padding" />, id: 2 },
  { path: '/calendar', name: tab3msg, icon: <FaCalendarAlt className="header__icon-padding" />, id: 3 },
  { path: '/standings', name: tab4msg, icon: <FaListUl className="header__icon-padding" />, id: 4 },
]

export const adminMenu = [
  { path: '/calendar', name: tab5msg, icon: <FaChevronCircleRight className="header__icon-padding" />, id: 5 },
  { path: '/editor', name: tab6msg, icon: <FaPenNib className="header__icon-padding" />, id: 6 }
]
