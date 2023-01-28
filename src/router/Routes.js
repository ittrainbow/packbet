import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Header, About, Week, PageNotFound, ContextLog, Calendar, Editor } from '../pages'
import { Register, Login, Dashboard, UserPage, Profile } from '../authPages'
import { Loader } from '../UI/Loader/Loader'

const AppRoutes = () => {
  const { loading } = useSelector((state) => state)

  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route exact path="/" element={<About />} />
          <Route exact path="/userpage" element={<UserPage />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/calendar" element={<Calendar />} />
          <Route exact path="/editor" element={<Editor />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/week" element={<Week />} />
          <Route path="/week/:id" element={<Week />} />
          <Route exact path="/create" element={<ContextLog />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default AppRoutes
