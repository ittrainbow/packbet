import React, { useContext } from 'react'

import './Standings.scss'

import { Context } from '../../App'

export const Standings = () => {
  const { standingsContext } = useContext(Context)

  const renderRows = () => {
    return Object.keys(standingsContext).map((el, index) => {
      const { name, uid, slash, total, correct } = standingsContext[el]
      return (
        <tr key={index}>
          <td className="cellOne">{index + 1}</td>
          <td className="cellTwo" onClick={() => clickHandler(uid)}>
            {name}
          </td>
          <td className="cellThree">{slash}</td>
          <td className="cellFour">{correct}</td>
          <td className="cellThree">{total}</td>
        </tr>
      )
    })
  }

  const clickHandler = (uid) => {
    console.log(uid)
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
