import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App(props) {
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
};

export default App;