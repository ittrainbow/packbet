import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux'

import { Dashboard, Login } from '.'
import { auth } from '../../db'
import { selectApp } from '../../redux/selectors'
import { Loader } from '../../ui'

export const UserPage = () => {
  const [user] = useAuthState(auth)
  const { loading } = useSelector(selectApp)

  return loading ? <Loader /> : user ? <Dashboard /> : <Login />
}
