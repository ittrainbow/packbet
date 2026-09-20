import { useSelector } from 'react-redux'

import { BallIcon, CalendarIcon, ChevronIcon, InfoIcon, ListIcon, PenIcon, UserIcon } from '@/icons'
import { i18n, Locale } from '@/locale'
import { selectUser } from '@/redux/selectors'

export function useMenu() {
  const { locale, admin } = useSelector(selectUser)
  const { tab0msg, tab1msg, tab2msg, tab3msg, tab4msg, tab5msg, tab6msg } = i18n(locale, 'header') as Locale

  const userMenu = [
    { path: '/', name: tab0msg, icon: <InfoIcon />, id: 0 },
    { path: '/userpage', name: tab1msg, icon: <UserIcon />, id: 1 },
    { path: '/week', name: tab2msg, icon: <BallIcon />, id: 2 },
    { path: '/season', name: tab3msg, icon: <CalendarIcon />, id: 3 },
    { path: '/standings', name: tab4msg, icon: <ListIcon />, id: 4 }
  ]

  const adminMenu = [
    { path: '/calendar', name: tab5msg, icon: <ChevronIcon />, id: 5 },
    { path: '/editor', name: tab6msg, icon: <PenIcon />, id: 6 }
  ]

  return admin ? [...userMenu, ...adminMenu] : userMenu
}
