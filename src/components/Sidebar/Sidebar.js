import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {
  FaHome,
  FaUserAlt,
  FaListUl,
  FaCalendarAlt,
  FaFootballBall,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import './Sidebar.css';

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
      {
        path: '/',
        name: 'Home',
        icon:  <FaHome/>
      },
      {
        path: '/profile',
        name: 'Profile',
        icon: <FaUserAlt/>
      },
      {
        path: '/thisweek',
        name: 'Current',
        icon: <FaFootballBall/>
      },
      {
        path: '/calendar',
        name: 'Calendar',
        icon: <FaCalendarAlt/>
      },
      {
        path: '/standings',
        name: 'Standings',
        icon: <FaListUl/>
      }
    ];

    return (
      <div className="container">
        <div style={{width: this.state.isOpen ? '150px': '45px'}} className="sidebar">
          <div className="top_section">
            <div style={{marginLeft: '-4px', cursor: 'pointer'}} className="bars">
              {this.state.isOpen 
                ? <FaTimes onClick={() => this.toggle()}/>              
                : <FaBars onClick={() => this.toggle()}/>
              }
            </div>
          </div>
          {
            menuItem.map((item, index) => {
              return (
                <NavLink to={item.path} key={index} className="link" activeclassname="active">
                  <div className="icon">
                    {item.icon}
                  </div>
                  <div style={{display: this.state.isOpen ? 'block': 'none'}} className="link_text">
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

export default Sidebar;
