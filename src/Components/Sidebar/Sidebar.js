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
import './Sidebar.css'

const Sidebar = (props) => {
  const navigate = useNavigate()

  const menuItem = [
    { path: '/', name: 'Инфо', icon: <FaHome />, index: 0 },
    { path: '/profile', name: 'Профиль', icon: <FaUserAlt />, index: 1 },
    { path: '/standings', name: 'Таблица', icon: <FaListUl />, index: 2 },
    { path: '/thisweek', name: 'Текущая\u00A0игра', icon: <FaFootballBall />, index: 3 },
    { path: '/calendar', name: 'Календарь', icon: <FaCalendarAlt />, index: 4 },
    { path: '/standings', name: 'Таблица', icon: <FaListUl />, index: 5 },
    { path: '/editor', name: 'Редактор', icon: <FaChevronCircleRight />, index: 6 },
    { path: '/create', name: 'Новая\u00A0Неделя', icon: <FaStrava />, index: 7 }
  ]

  // if (props.isAuthenticated) {
  //   menuItem.pop()
  //   menuItem.push(
  //     { path: '/thisweek', name: 'Текущая\u00A0игра', icon: <FaFootballBall />, index: 2 },
  //     { path: '/calendar', name: 'Календарь', icon: <FaCalendarAlt />, index: 3 },
  //     { path: '/standings', name: 'Таблица', icon: <FaListUl />, index: 4 }
  //   )
  // }

  // if (props.isAdmin) {
  //   menuItem.push(
  //     { path: '/editor', name: 'Редактор', icon: <FaChevronCircleRight />, index: 5 },
  //     { path: '/create', name: 'Новая\u00A0Неделя', icon: <FaStrava />, index: 6 }
  //   )
  // }

  function toggleSidebarOpen() {
    const bool = props.isOpen
    props.toggleSidebar(!bool)
  }

  function clickHandler(item) {
    props.setTabActive(item.index)
    navigate(item.path)
  }

  function classSelector(index, active) {
    if (!index && active) return 'FirstActive'
    if (index && active) return 'OthersActive'
    if (!index && !active) return 'FirstInactive'
    if (index && !active) return 'OthersInactive'
  }

  function renderMobile() {
    return (
      <div>
        <div className="SidebarMobile">
          <table>
            <thead>
              <tr>
                {menuItem.map((item, index) => {
                  return (
                    <td key={index}>
                      <div
                        className={classSelector(index, index === props.tabActive)}
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
        <main className="MainMobile">{props.children}</main>
      </div>
    )
  }

  function renderDesktop() {
    return (
      <div>
        <div className="Container">
          <div
            style={{ height: props.height }}
            className={props.isOpen ? 'SidebarOpen' : 'SidebarClosed'}
          >
            <div className="Bars" onClick={() => toggleSidebarOpen()}>
              {props.isOpen ? <FaTimes /> : <FaBars />}
            </div>

            {menuItem.map((item, index) => {
              return (
                <NavLink to={item.path} key={index} className="Link">
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
