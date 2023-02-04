import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Routes.scss'

import { Header, About, Week, PageNotFound, Calendar, Editor, Standings } from '../pages'
import { Register, Login, Dashboard, UserPage, Profile, Reset } from '../authPages'
import { Loader } from '../UI/Loader/Loader'

const AppRoutes = () => {
  const { loading } = useSelector((state) => state)

  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <div className='loader-div'>
          <Loader />
        </div>
      ) : (
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route exact path="/userpage" element={<UserPage />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/week" element={<Week />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/standings" element={<Standings />} />
          <Route exact path="/editor" element={<Editor />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default AppRoutes
