import React, { useEffect, useReducer } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../db/firebase'
import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'

const initialState = {
  email: '',
  password: '',
  name: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      return { ...state, email: action.payload }
    case 'PASSWORD':
      return { ...state, password: action.payload }
    case 'NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}

export const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { email, password, name } = state
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  const register = () => {
    if (!name) alert('Please enter name')
    if (!email) alert('Please enter Email')
    if (password.length < 3) alert('Please type password of 3 chars or more')
    else registerWithEmailAndPassword(name, email, password)
  }

  useEffect(() => {
    if (loading) return
    if (user) navigate('/dashboard')
    return // eslint-disable-next-line
  }, [loading, user])

  return (
    <div className="auth">
      <div className="auth__container">
        <input
          type="text"
          className="auth__textBox"
          value={name}
          onChange={(e) => dispatch({ type: 'NAME', payload: e.target.value })}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="auth__textBox"
          value={email}
          onChange={(e) => dispatch({ type: 'EMAIL', payload: e.target.value })}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="auth__textBox"
          value={password}
          onChange={(e) => dispatch({ type: 'PASSWORD', payload: e.target.value })}
          placeholder="Password"
        />
        <button className="auth__btn" onClick={register}>
          Register
        </button>
        <button className="auth__btn auth__google" onClick={signInWithGoogle}>
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  )
}
