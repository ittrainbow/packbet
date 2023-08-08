import { ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { About, Week, Calendar, Season, Editor, Standings, Weeklist } from '../pages'
import { Register, Login, Dashboard, UserPage, Profile, Reset } from '../authPages'
import { Loader } from '../UI'
import { selectApp } from '../redux/selectors'

type RouterProps = {
  children?: ReactNode
}

export const Router = ({ children }: RouterProps) => {
  const { loading } = useSelector(selectApp)

  const routes = () => {
    return (
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/season" element={<Weeklist />} />
        <Route path="/calendar" element={<Weeklist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/week" element={<Week />}>
          <Route path=":id" element={<Week />} />
        </Route>
        <Route path="/reset" element={<Reset />} />
        <Route path="/standings" element={<Standings />} />
        <Route path="/editor" element={<Editor />}>
          <Route path=":id" element={<Editor />} />
        </Route>
        <Route path="/creator" element={<Editor />} />
      </Routes>
    )
  }

  return (
    <BrowserRouter>
      {children}
      {loading ? <Loader /> : routes()}
    </BrowserRouter>
  )
}
