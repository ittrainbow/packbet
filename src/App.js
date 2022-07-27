import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './hoc/Sidebar/Sidebar';
import Profile from './pages/Profile/Profile';
import Calendar from './pages/Calendar/Calendar';
import Standings from './pages/Standings/Standings';
import About from './pages/About/About';
import CurrentWeek from './pages/CurrentWeek/CurrentWeek';
import WeekCreator from './hoc/WeekCreator/WeekCreator';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/thisweek' element={<CurrentWeek/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
          <Route path='/standings' element={<Standings/>}/>
          <Route path='/create' element={<WeekCreator/>}/>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;