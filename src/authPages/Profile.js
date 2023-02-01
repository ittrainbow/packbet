import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDoc, setDoc, doc } from 'firebase/firestore'

import './auth.scss'

import { auth, db } from '../db'
import { Loader } from '../UI'
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

  const changes = () => name === userContext.name

  return loading ? (
    <Loader />
  ) : (
    <div className="auth">
      <div className="auth__container">
        <div className="auth__name">Новое имя</div>
        <input
          className="auth__textBox"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className={changes() ? 'auth__dashboard auth__btn__inactive' : 'auth__dashboard'}
          disabled={name === userContext.name}
          onClick={submitHandler}
        >
          {changes() ? 'Изменений нет' : 'Сохранить'}
        </button>
        <button className="auth__dashboard" onClick={() => navigate(-1)}>
          Отменить
        </button>
      </div>
    </div>
  )
}
