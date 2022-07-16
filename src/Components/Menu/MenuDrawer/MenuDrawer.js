import React, {Component} from 'react';
import classes from './MenuDrawer.module.scss';
import MenuBackDrop from '../MenuBackDrop/MenuBackDrop';

const links = [
  'Profile',
  'Weeks',
  'Standings',
];

class MenuDrawer extends Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href=" ">{link}</a>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.MenuDrawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <React.Fragment>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen 
          ? <MenuBackDrop 
              onClick={this.props.onClose}
            /> 
          : null} 
      </React.Fragment>

    );
  }
}

export default MenuDrawer;