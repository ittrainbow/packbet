import React from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Profile from './pages/Profile/Profile';
import Calendar from './pages/Calendar/Calendar';
import Standings from './pages/Standings/Standings';
import About from './pages/About/About';
import CurrentWeek from './pages/CurrentWeek/CurrentWeek';
import WeekCreator from './Components/WeekCreator/WeekCreator';
import Week from './Components/Week/Week';
import WeekEditor from './Components/WeekEditor/WeekEditor';
import Editor from './pages/Editor/Editor';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/thisweek' element={<CurrentWeek/>}/>          
          <Route path='/week/:id' element={<Week/>} />
          <Route path='/calendar' element={<Calendar/>}/> 
          <Route path='/editor' element={<Editor/>}/>            
          <Route path='/weekeditor/:id' element={<WeekEditor/>}/>
          <Route path='/standings' element={<Standings/>}/>
          <Route path='/create' element={<WeekCreator/>}/>
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;