import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Profile from './pages/Profile/Profile';
import Calendar from './pages/Calendar/Calendar';
import Standings from './pages/Standings/Standings';
import Week from './pages/Week/Week';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/'/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/thisweek' element={<Week/>}/>
          <Route path='/calendar' element={<Calendar/>}/>
          <Route path='/standings' element={<Standings/>}/>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;