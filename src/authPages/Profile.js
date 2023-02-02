import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDoc, setDoc, doc } from 'firebase/firestore'

import './auth.scss'

import { auth, db } from '../db'
import { Button, Loader, Input } from '../UI'
import { Context } from '../App'
import { setLoading } from '../redux/actions'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state)
  const { userContext, setUserContext } = useContext(Context)
  const [name, setName] = useState('')

  useEffect(() => {
    const { name } = userContext
    setName(name) // eslint-disable-next-line
  }, [])

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const { uid } = auth.currentUser
      const response = await getDoc(doc(db, 'users', uid))
      const data = { ...response.data(), name }

      await setDoc(doc(db, 'users', uid), data)
      setUserContext(data)
    } catch (error) {
      console.error(error)
    }
    dispatch(setLoading(false))
    navigate(-1)
  }

  const noChanges = () => name === userContext.name

  return loading ? (
    <Loader />
  ) : (
    <div className="container">
      <div className="auth">
        <div className="auth__container">
          <div className="text-container">Изменить профиль</div>
          <Input type={'text'} onChange={(e) => setName(e.target.value)} value={name} />
          <Button disabled={noChanges()} onClick={submitHandler}>
            {noChanges() ? 'Изменений нет' : 'Сохранить'}
          </Button>
          <Button onClick={() => navigate(-1)}>Отменить</Button>
        </div>
      </div>
    </div>
  )
}
