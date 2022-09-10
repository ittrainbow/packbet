import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux/es/exports'
import { actionToggleSidebar}  from '../../redux/actions/viewActions'
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
    { path: '/', name: 'Инфо', icon: <FaHome /> },
    { path: '/profile', name: 'Профиль', icon: <FaUserAlt /> },
    { path: '/standings', name: 'Таблица', icon: <FaListUl /> }
  ]

  if (props.isAuthenticated) {
    menuItem.pop()
    menuItem.push(
      { path: '/thisweek', name: 'Текущая\u00A0игра', icon: <FaFootballBall /> },
      { path: '/calendar', name: 'Календарь', icon: <FaCalendarAlt /> },
      { path: '/standings', name: 'Таблица', icon: <FaListUl /> }
    )
  }

  if (props.isAdmin) {
    menuItem.push(
      { path: '/editor', name: 'Редактор', icon: <FaChevronCircleRight /> },
      { path: '/create', name: 'Новая\u00A0Неделя', icon: <FaStrava /> }
    )
  }

  function toggle() {
    const bool = props.isOpen
    props.toggleSidebar(!bool)
  }

  return props.mobile
    ? <div>
        <div className={classes.ContainerMobile}>
          <div style={{ width: '100%' }} className={classes.SidebarMobile}>
            <table><thead><tr>            
                {menuItem.map((item, index) => {
                  return (
                    <td key={index}>
                      <div style={{fontSize: '35px', marginLeft: '20px', marginTop: '10px'}}
                        onClick={() => navigate(item.path)}  
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
    isOpen: state.view.isOpen
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSidebar: (boolean) => dispatch(actionToggleSidebar(boolean))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
