import React, { useContext, useEffect } from 'react'

import './Standings.scss'

import { Context } from '../../App'

export const Standings = () => {
  const { userListContext, answersContext } = useContext(Context)
  // const [list, setList] = useState()

  const userList = Object.keys(userListContext)

  useEffect(() => {
    const obj = {}
    userList.forEach((el) => {
      const { name } = userListContext[el]
      const answers = answersContext[el] ? answersContext[el] : null
      const res = answersContext.results ? answersContext.results : null
      obj[el] = {
        name,
        answers,
        res
      }
    })
    console.log(obj)
    // eslint-disable-next-line
  }, [])

  const clickHandler = () => {
    console.log(0, userListContext)
    console.log(1, answersContext)
  }

  return (
    <div className="container">
      <h3>Standings</h3>
      <button onClick={() => clickHandler()}>123</button>
    </div>
  )
}
