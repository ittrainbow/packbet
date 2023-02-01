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
  { path: '/', name: 'Об игре', icon: <FaInfoCircle className="header__icon-padding"/>, id: 0 },
  { path: '/userpage', name: 'Профиль', icon: <FaUserAlt className="header__icon-padding" />, id: 1 },
  { path: '/week', name: 'Неделя', icon: <FaFootballBall className="header__icon-padding" />, id: 2 },
  { path: '/calendar', name: 'Календарь', icon: <FaCalendarAlt className="header__icon-padding" />, id: 3 },
  { path: '/standings', name: 'Таблица', icon: <FaListUl className="header__icon-padding" />, id: 4 },
]

export const adminMenu = [
  { path: '/calendar', name: 'Редактор', icon: <FaChevronCircleRight className="header__icon-padding" />, id: 5 },
  { path: '/editor', name: 'Создать', icon: <FaPenNib className="header__icon-padding" />, id: 6 }
]
