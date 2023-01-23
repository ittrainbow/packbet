import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from '../pages/Header/Header'

// import Sidebar from '../Components/Sidebar/Sidebar'
// import WeekEditor from '../Components/WeekEditor/WeekEditor'
// import { Home as About, Calendar, Creator, CurrentWeek, Editor, OldWeek, Profile, Standings, Password } from '../pages'
// import AdminRoute from './AdminRoute'
// import PrivateRoute from './PrivateRoute'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          {/* <Route path="/" element={<About />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/standings" element={<Standings />} /> */}
          {/* <Route path="/recover" element={<Password />} /> */}

          {/* <Route exact path="/" element={<PrivateRoute />}> */}
          {/* <Route path="/thisweek" element={<CurrentWeek />} /> */}
          {/* </Route> */}

          {/* <Route exact path="/" element={<PrivateRoute />}> */}
          {/* <Route path="/calendar" element={<Calendar />} /> */}
          {/* </Route> */}

          {/* <Route exact path="/" element={<PrivateRoute />}> */}
          {/* <Route path="/week/:id" element={<OldWeek />} /> */}
          {/* </Route> */}

          {/* <Route exact path="/" element={<AdminRoute />}> */}
          {/* <Route path="/editor" element={<Editor />} /> */}
          {/* </Route> */}

          {/* <Route exact path="/" element={<AdminRoute />}> */}
          {/* <Route exact path="/create/:id" element={<WeekEditor />} /> */}
          {/* </Route> */}

          {/* <Route exact path="/" element={<AdminRoute />}> */}
          {/* <Route path="/create" element={<Creator />} /> */}
          {/* </Route> */}
        </Routes>
      </Header>
    </BrowserRouter>
  )
}

export default AppRoutes
