import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './Standings.scss'

import { Context } from '../../App'
import { setEditor } from '../../redux/actions'

export const Standings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { standingsContext, appContext, setAppContext } = useContext(Context)

  const renderRows = () => {
    return Object.keys(standingsContext).map((el, index) => {
      const { name, uid, slash, total, correct } = standingsContext[el]
      return (
        <tr key={index}>
          <td className="cellOne">{index + 1}</td>
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
    setAppContext({
      ...appContext,
      otherUserUID: uid,
      otherUserName: name,
      isItYou: false
    })
    dispatch(setEditor(false))
    navigate('/calendar')
  }

  return (
    <div className="container">
      <h3>Таблица</h3>
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
