import { useAppContext } from '../context/Context'

export const AdminPlayer = () => {
  const { userContext, setUserContext } = useAppContext()
  const { adminAsPlayer } = userContext

  const setContextHandler = () => {
    setUserContext({ ...userContext, adminAsPlayer: !adminAsPlayer })
  }

  return (
    <label className="switch">
      <input type="checkbox" checked={adminAsPlayer} onChange={setContextHandler} />
      <span className="slider round"></span>
    </label>
  )
}
