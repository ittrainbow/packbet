import React, {Component} from 'react';
import classes from './Menu.module.scss';
import MenuToggle from './MenuToggle/MenuToggle';
import MenuDrawer from './MenuDrawer/MenuDrawer';

class Menu extends Component {
  state = {
    menu: false
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    });
  };

  menuCloseHandler = () => {
    this.setState({
      menu: false
    });
  };

  render() {
    return (
      <div className={classes.Menu}>
        <MenuDrawer 
          onClose={this.menuCloseHandler}          
          isOpen={this.state.menu}
        />
        <MenuToggle 
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
      </div>
    );
  }
};

export default Menu;