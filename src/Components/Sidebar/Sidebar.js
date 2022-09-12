import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
import { actionToggleSidebar, actionSetTabActive }  from '../../redux/actions/viewActions'
import {
  FaHome,
  FaUserAlt,
  FaListUl,
  FaCalendarAlt,
  FaFootballBall,
  FaChevronCircleRight,
  FaBars,
  FaTimes,
  FaStrava
} from 'react-icons/fa'
import './Sidebar.module.scss'
import classes from './Sidebar.module.scss'

const Sidebar = (props) => {
  const navigate = useNavigate()

  const menuItem = [
    { path: '/', name: 'Инфо', icon: <FaHome />, index: 0 },
    { path: '/profile', name: 'Профиль', icon: <FaUserAlt />, index: 1 },
    { path: '/standings', name: 'Таблица', icon: <FaListUl />, index: 2 }
  ]

  if (props.isAuthenticated) {
    menuItem.pop()
    menuItem.push(
      { path: '/thisweek', name: 'Текущая\u00A0игра', icon: <FaFootballBall />, index: 2 },
      { path: '/calendar', name: 'Календарь', icon: <FaCalendarAlt />, index: 3 },
      { path: '/standings', name: 'Таблица', icon: <FaListUl />, index: 4 }
    )
  }

  if (props.isAdmin) {
    menuItem.push(
      { path: '/editor', name: 'Редактор', icon: <FaChevronCircleRight />, index: 5 },
      { path: '/create', name: 'Новая\u00A0Неделя', icon: <FaStrava />, index: 6 }
    )
  }

  function toggle() {
    const bool = props.isOpen
    props.toggleSidebar(!bool)
  }

  function clickHandler(item) {
    props.setTabActive(item.index)
    navigate(item.path)
  }

  return props.mobile
    ? <div>
        <div className={classes.ContainerMobile}>
          <div style={{ width: '100%' }} className={classes.SidebarMobile}>
            <table><thead><tr>            
                {menuItem.map((item, index) => {
                  return (
                    <td key={index}>
                      <div 
                        className={item.index === props.tabActive ? classes.UpperGreen : classes.UpperGrey}
                        onClick={() => clickHandler(item)}
                      >
                        {item.icon}
                      </div>
                    </td>
                  )
                })}
              </tr></thead></table>
          </div>
        </div>
        <main className={classes.MainMobile}>{props.children}</main>
      </div>
    : <div>
        <div className={classes.Container}>
          <div style={{ width: props.isOpen ? '170px' : '45px' }} className={classes.Sidebar}>
            <div className={classes.TopSection}>
              <div className={classes.Bars} style={{ marginLeft: '-4px', cursor: 'pointer' }} >
                { props.isOpen 
                  ? <FaTimes onClick={() => toggle()} /> 
                  : <FaBars onClick={() => toggle()} /> }
              </div>
            </div>
            {menuItem.map((item, index) => {
              return (
                <NavLink to={item.path} key={index} className={classes.Link}>
                  <div className={classes.Icon}> 
                    {item.icon} 
                  </div>
                  <div style={{ display: 'block' }} className={classes.LinkText}>
                    {props.isOpen ? item.name : null}
                  </div>
                </NavLink>
              )
            })}
          </div>
          <main>{props.children}</main>
        </div>
    </div>
  }


function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    isAdmin: state.auth.isAdmin,
    mobile: state.view.mobile,
    tabActive: state.view.tabActive,
    isOpen: state.view.isOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: (boolean) => dispatch(actionToggleSidebar(boolean)),
    setTabActive: (index) => dispatch(actionSetTabActive(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
