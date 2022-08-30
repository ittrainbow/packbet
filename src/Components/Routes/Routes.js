import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Sidebar from '../Sidebar/Sidebar'
import WeekEditor from '../WeekEditor/WeekEditor'
import About from '../../pages/About'
import Calendar from '../../pages/Calendar'
import Creator from '../../pages/Creator'
import CurrentWeek from '../../pages/CurrentWeek'
import Editor from '../../pages/Editor'
import OldWeek from '../../pages/OldWeek'
import Profile from '../../pages/Profile'
import Standings from '../../pages/Standings'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/standings' element={<Standings/>}/>

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path='/thisweek' element={<CurrentWeek/>}/>
          </Route>

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path='/calendar' element={<Calendar/>}/>
          </Route>

          <Route exact path='/' element={<PrivateRoute/>}>
            <Route path='/week/:id' element={<OldWeek/>} />
          </Route>

          <Route exact path='/' element={<AdminRoute/>}>
            <Route path='/editor' element={<Editor/>}/>
          </Route>

          <Route exact path='/' element={<AdminRoute/>}>
            <Route exact path='/weekeditor/:id' element={<WeekEditor/>}/>
          </Route>

          <Route exact path='/' element={<AdminRoute/>}>
            <Route path='/create' element={<Creator/>}/>
          </Route>
        </Routes>
      </Sidebar>

    </BrowserRouter>
  )
}

export default AppRoutes