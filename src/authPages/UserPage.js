import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

import { Login, Dashboard } from '.'
import { auth } from '../db/firebase'

export const UserPage = () => {
  const [user] = useAuthState(auth)
  
  return user ? <Dashboard /> : <Login />
}
