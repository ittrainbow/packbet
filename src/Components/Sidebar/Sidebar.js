import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
import { actionToggleSidebar, actionSetTabActive } from '../../redux/actions/viewActions'
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

  function toggleSidebarOpen() {
    const bool = props.isOpen
    props.toggleSidebar(!bool)
  }

  function clickHandler(item) {
    props.setTabActive(item.index)
    navigate(item.path)
  }

  function renderMobile() {
    return (
      <div>
        <div className={classes.SidebarMobile}>
          <table>
            <thead>
              <tr>
                {menuItem.map((item, index) => {
                  return (
                    <td key={index}>
                      <div
                        style={{
                          color: index === props.tabActive ? '#3d9f40' : '#d3d3d3',
                          fontSize: !index ? '44px' : '36px',
                          marginTop: !index ? '7px' : '5px',
                          marginLeft: !index ? '15px' : '12px',
                          marginRight: !index ? '3px' : '4px'
                        }}
                        onClick={() => clickHandler(item)}
                      >
                        {item.icon}
                      </div>
                    </td>
                  )
                })}
              </tr>
            </thead>
          </table>
        </div>
        <main className={classes.MainMobile}>{props.children}</main>
      </div>
    )
  }

  function renderDesktop() {
    return (
      <div>
        <div className={classes.Container}>
          <div
            style={{
              width: props.isOpen ? '170px' : '45px',
              height: props.height
            }}
            className={classes.Sidebar}
          >
            <div className={classes.Bars} onClick={() => toggleSidebarOpen()}>
              {props.isOpen ? <FaTimes /> : <FaBars />}
            </div>
            {menuItem.map((item, index) => {
              return (
                <NavLink to={item.path} key={index} className={classes.Link}>
                  <div> {item.icon} </div>
                  <div> {props.isOpen ? item.name : null} </div>
                </NavLink>
              )
            })}
          </div>
          <main>{props.children}</main>
        </div>
      </div>
    )
  }

  return props.mobile ? renderMobile() : renderDesktop()
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    isAdmin: state.auth.isAdmin,
    mobile: state.view.mobile,
    tabActive: state.view.tabActive,
    isOpen: state.view.isOpen,
    height: state.view.height
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: (boolean) => dispatch(actionToggleSidebar(boolean)),
    setTabActive: (index) => dispatch(actionSetTabActive(index))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
