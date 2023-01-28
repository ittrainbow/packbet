import {
  FaInfoCircle,
  FaUserAlt,
  FaFootballBall,
  FaCalendarAlt,
  FaListUl,
  FaChevronCircleRight,
  FaPenNib
} from 'react-icons/fa'

export const userMenu = [
  { path: '/', name: 'Info', icon: <FaInfoCircle className="header__icon-padding"/>, id: 0 },
  { path: '/userpage', name: 'Profile', icon: <FaUserAlt className="header__icon-padding" />, id: 1 },
  { path: '/week', name: 'Game', icon: <FaFootballBall className="header__icon-padding" />, id: 2 },
  { path: '/calendar', name: 'Calendar', icon: <FaCalendarAlt className="header__icon-padding" />, id: 3 },
  { path: '/standings', name: 'Ranking', icon: <FaListUl className="header__icon-padding" />, id: 4 },
]

export const adminMenu = [
  { path: '/calendar', name: 'Editor', icon: <FaChevronCircleRight className="header__icon-padding" />, id: 5 },
  { path: '/create', name: 'Create', icon: <FaPenNib className="header__icon-padding" />, id: 6 }
]
