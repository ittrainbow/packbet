import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux/es/exports';
import { autoLogin } from './redux/actions/authActions';
import Sidebar from './Components/Sidebar/Sidebar';
import About from './pages/About';
import Calendar from './pages/Calendar';
import Creator from './pages/Creator';
import CurrentWeek from './pages/CurrentWeek';
import Editor from './pages/Editor';
import OldWeek from './pages/OldWeek';
import Profile from './pages/Profile';
import Standings from './pages/Standings';
import WeekEditor from './Components/WeekEditor/WeekEditor';
import InitState from './Components/InitState/InitState';

class App extends Component {

  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    return (
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path='/' element={<About/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/thisweek' element={<CurrentWeek/>}/>
            <Route path='/week/:id' element={<OldWeek/>} />
            <Route path='/calendar' element={<Calendar/>}/> 
            <Route path='/editor' element={<Editor/>}/>
            <Route path='/weekeditor/:id' element={<WeekEditor/>}/>
            <Route path='/standings' element={<Standings/>}/>
            <Route path='/create' element={<Creator/>}/>
          </Routes>
        </Sidebar>
        <InitState/>
      </BrowserRouter>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);