import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'react-firebase-hooks/auth'

import './Standings.scss'

import { Context } from '../../App'
import { setEditor } from '../../redux/actions'
import { auth } from '../../db'

export const Standings = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { standingsContext, appContext, setAppContext } = useContext(Context)

  const getPosition = (i) =>
    i > 0 && standingsContext[i].correct === standingsContext[i - 1].correct ? '-' : i + 1

  const renderRows = () => {
    return Object.keys(standingsContext).map((el, index) => {
      const { name, uid, slash, total, correct } = standingsContext[el]
      return (
        <tr key={index}>
          <td className="cellOne">{getPosition(index)}</td>
          <td className="cellTwo" onClick={() => clickHandler(uid, name)}>
            {name}
          </td>
          <td className="cellThree">{slash}</td>
          <td className="cellFour">{correct}</td>
          <td className="cellThree">{total}</td>
        </tr>
      )
    })
  }

  const clickHandler = (uid, name) => {
    const otherUser = uid !== user.uid
    const obj = {
      ...appContext,
      otherUserUID: otherUser ? uid : null,
      otherUserName: otherUser ? name : null,
      isItYou: otherUser ? false : true
    }
    setAppContext(obj)
    dispatch(setEditor(false))
    navigate('/calendar')
  }

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <td className="cellOne">#</td>
            <td className="cellTwo">Имя</td>
            <td className="cellThree">Всего</td>
            <td className="cellFour">Точно</td>
            <td className="cellThree">90%</td>
          </tr>
          {renderRows()}
        </thead>
      </table>
    </div>
  )
}
