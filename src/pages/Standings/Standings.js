import React, { useContext, useState, useEffect } from 'react'

import './Standings.scss'

import { Context } from '../../App'
import { tableObjectCreator } from '../../helpers'
const init = {
  name: 'name',
  uid: 'uid',
  slash: 'slash',
  total: 'total',
  correct: 'correct'
}

export const Standings = () => {
  const { userListContext, answersContext } = useContext(Context)
  const [obj, setObj] = useState(init)

  const userList = Object.keys(userListContext)

  const tableCreator = () => {
    const object = {}
    userList.forEach((el) => {
      let ansTotal = 0
      let ansCorrect = 0
      let resultsTotal = 0
      const uid = el
      const { name } = userListContext[el]
      const ans = answersContext[el] || null
      const res = answersContext.results || null
      Object.keys(res).forEach((el) => {
        const subAns = ans ? ans[el] : null
        Object.keys(res[el]).forEach((i) => {
          resultsTotal++
          if (subAns && subAns[i]) ansTotal++
          if (subAns && subAns[i] && subAns[i] === res[el][i]) ansCorrect++
        })
      })

      const { total, correct, slash } = tableObjectCreator(ansTotal, ansCorrect, resultsTotal)
      object[el] = { name, uid, slash, total, correct }

      const array = []
      Object.keys(object).map((el) => array.push(object[el]))
      const compare = (a, b) => (a.correct < b.correct ? 1 : a.correct > b.correct ? -1 : 0)
      array.sort(compare)
      setObj(array)
    })
  }

  useEffect(() => {
    tableCreator()
    // eslint-disable-next-line
  }, [])

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
          {Object.keys(obj).map((el, index) => {
            const { name, uid, slash, total, correct } = obj[el]
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
          })}
        </thead>
      </table>
    </div>
  )
}
