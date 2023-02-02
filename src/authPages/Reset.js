import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { auth } from '../db/firebase'
import { sendPasswordReset } from '../db/auth'

import './auth.scss'
import { Button } from '../UI'

export const Reset = () => {
  const [email, setEmail] = useState('')
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
    if (user) navigate('/') // eslint-disable-next-line
  }, [user, loading])

  return (
    <div className="auth">
      <div className="auth__container">
        <input
          type="text"
          className="auth__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Button className="login" onClick={() => sendPasswordReset(email)}>
          Выслать письмо
        </Button>
        <div>
          Нет аккаунта? <Link to="/register">Регистрация</Link>.
        </div>
      </div>
    </div>
  )
}
