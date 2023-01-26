import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getDoc, setDoc, doc } from 'firebase/firestore'

import './auth.scss'

import { auth, db } from '../db'
import { Loader, Button } from '../UI'
import { Context } from '../App'
import { setLoading } from '../redux/actions'

export const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state)
  const { userContext, setUserContext } = useContext(Context)
  const [name, setName] = useState(userContext.name)

  const submitHandler = async () => {
    dispatch(setLoading(true))
    try {
      const { uid } = auth.currentUser
      const response = await getDoc(doc(db, 'users', uid))
      const data = {
        ...response.data(),
        name
      }

      await setDoc(doc(db, 'users', uid), data)
      setUserContext(data)
    } catch (error) {
      console.error(error)
    }
    dispatch(setLoading(false))
    navigate(-1)
  }

  const form = () => {
    return (
      <div className="auth">
        <div className="auth__container">
          <div className="auth__name">Change name</div>
          <input
            className="auth__textBox"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            className="buttonBig"
            disabled={name === userContext.name}
            onClick={submitHandler}
          >
            Save profile
          </Button>
          <Button className="buttonBig" onClick={() => navigate(-1)}>
            Cancel changes
          </Button>
        </div>
      </div>
    )
  }

  return loading ? <Loader /> : form()
}
