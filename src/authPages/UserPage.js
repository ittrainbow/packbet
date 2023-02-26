import React from 'react'

import { Login, Dashboard } from '.'
import { auth } from '../db/firebase'

export const UserPage = () => (auth.currentUser ? <Dashboard /> : <Login />)
