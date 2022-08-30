import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux/es/exports';
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
} from 'react-icons/fa';
import './Sidebar.module.scss';
import classes from './Sidebar.module.scss';

class Sidebar extends Component {
  state = {
    isOpen: false
  };

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const menuItem = [
      { path: '/', name: 'About', icon:  <FaHome/> },
      { path: '/profile', name: 'Profile', icon: <FaUserAlt/> },
      { path: '/standings', name: 'Standings', icon: <FaListUl/> },
      { path: '/editor', name: 'Editor', icon: <FaChevronCircleRight/> },
      { path: '/create', name: 'New\u00A0Week', icon:  <FaStrava/> },
    ];

    if (this.props.isAuthenticated) {
      menuItem.pop();
      menuItem.push(
        { path: '/thisweek', name: 'This\u00A0Week', icon: <FaFootballBall/> },
        { path: '/calendar', name: 'Calendar', icon: <FaCalendarAlt/> },
        { path: '/standings', name: 'Standings', icon: <FaListUl/> }
      );
    }

    if (this.props.isAdmin) {
      menuItem.push(
        { path: '/editor', name: 'Editor', icon: <FaChevronCircleRight/> },
        { path: '/create', name: 'New\u00A0Week', icon:  <FaStrava/> },
      );
    }

    return (
      <div className={classes.Container}>
        <div style={{width: this.state.isOpen ? '150px': '45px'}} className={classes.Sidebar}>
          <div className={classes.TopSection}>
            <div style={{marginLeft: '-4px', cursor: 'pointer'}} className={classes.Bars}>
              {this.state.isOpen 
                ? <FaTimes onClick={() => this.toggle()}/>              
                : <FaBars onClick={() => this.toggle()}/>
              }
            </div>
          </div>
          {
            menuItem.map((item, index) => {
              return (
                <NavLink to={item.path} key={index} className={classes.Link}>
                  <div className={classes.Icon}>
                    {item.icon}
                  </div>
                  <div style={{display: this.state.isOpen ? 'block': 'none'}} className={classes.LinkText}>
                    {this.state.isOpen ? item.name : null}
                  </div>
                </NavLink>
              );
            })
          }
        </div>
        <main>{this.props.children}</main>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateToProps, null)(Sidebar);