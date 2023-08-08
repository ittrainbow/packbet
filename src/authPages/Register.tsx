import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { auth } from '../db/firebase'
import { registerWithEmailAndPassword, signInWithGoogle } from '../db/auth'
import { Button, LocaleSwitcher } from '../UI'
import { Input } from '@mui/material'
import { i18n } from '../locale'
import { IUser, LocaleType } from '../types'
import { selectUser } from '../redux/selectors'
import { appActions, userActions } from '../redux/slices'

export const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { locale } = useSelector(selectUser)
  const inputRef = useRef<HTMLInputElement>()
  const [user, loading] = useAuthState(auth)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')

  const trimSpaces = (value: string) => value.replace(/\s/g, '')

  useEffect(() => {
    if (loading) return
    user && navigate('/dashboard')
    // eslint-disable-next-line
  }, [loading, user])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const setEmailReg = (value: boolean) => {
      dispatch(appActions.setEmailReg(value))
    }
    
    setEmailReg(true)
    return () => setEmailReg(false)
  }, [])

  const register = async () => {
    !name && alert(regNameAlert)
    !email && alert(regEmailAlert)
    password.length < 6 && alert(regPasswordAlert)
    if (name && email && password.length > 5) {
      const response = await registerWithEmailAndPassword(name, email, password)
      if (response) {
        const user: IUser = { admin: false, locale, name, buddies: [response.uid] }
        dispatch(userActions.setUser(user))
      }
    }
  }

  const nameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setName(value)
  }

  const emailInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(trimSpaces(value))
  }

  const passwordInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPassword(trimSpaces(value))
  }

  const googleClickHandler = async () => await signInWithGoogle()

  const { buttonRegisterMsg, buttonRegisterGoogleMsg } = i18n(locale, 'buttons') as LocaleType
  const { loginIntro, loginMsg, regNameMsg, regNameAlert, regEmailAlert, regPasswordAlert, emailMsg, passwordMsg } =
    i18n(locale, 'auth') as LocaleType

  return (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__data">
          <Input type="text" value={name} ref={inputRef} onChange={nameInputHandler} placeholder={regNameMsg} />
          <Input type="email" value={email} onChange={emailInputHandler} placeholder={emailMsg} />
          <Input type="password" value={password} onChange={passwordInputHandler} placeholder={passwordMsg} />
          <Button className="login" onClick={register}>
            {buttonRegisterMsg}
          </Button>
          <Button className="google" onClick={googleClickHandler}>
            {buttonRegisterGoogleMsg}
          </Button>
          <div className="link-container">
            {loginIntro} <Link to="/login">{loginMsg}</Link>
          </div>
        </div>
        <div className="locale-div">
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  )
}
