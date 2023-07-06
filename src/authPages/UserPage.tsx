import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'

import { selectApp } from '../redux/selectors'
import { Login, Dashboard } from '.'
import { Loader } from '../UI'
import { auth } from '../db/firebase'

export const UserPage = () => {
  const [user] = useAuthState(auth)
  const { loading } = useSelector(selectApp)

  return loading ? <Loader /> : user ? <Dashboard /> : <Login />
}
