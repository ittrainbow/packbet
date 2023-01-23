import {
  FaHome,
  FaUserAlt,
  FaListUl,
  FaCalendarAlt,
  FaFootballBall,
  FaChevronCircleRight,
  FaStrava
} from 'react-icons/fa'

export const menuItem = [
  { path: '/', name: 'Инфо', icon: <FaHome />, id: 0 },
  { path: '/profile', name: 'Профиль', icon: <FaUserAlt />, id: 1 },
  { path: '/thisweek', name: 'Текущая\u00A0игра', icon: <FaFootballBall />, id: 2 },
  { path: '/calendar', name: 'Календарь', icon: <FaCalendarAlt />, id: 3 },
  { path: '/standings', name: 'Таблица', icon: <FaListUl />, id: 4 },
  { path: '/editor', name: 'Редактор', icon: <FaChevronCircleRight />, id: 5 },
  { path: '/create', name: 'Новая\u00A0Неделя', icon: <FaStrava />, id: 6 }
]