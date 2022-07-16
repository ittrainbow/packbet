import React, { Component } from 'react';
import './App.scss';
import Week from './Components/Week';
import Menu from './Components/Menu/Menu';

class App extends Component {
  state = {
    active: true
  };

  render() {
    return (
      <div className="week">
        <Menu />
        <Week />        
      </div>
    );
}}

export default App;