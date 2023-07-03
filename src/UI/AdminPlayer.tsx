import { useAppContext } from '../context/Context'
import { Input } from './Input'
import { i18n } from '../locale/locale'
import { LocaleType } from '../types'

export const AdminPlayer = () => {
  const { userContext, setUserContext } = useAppContext()
  const { adminAsPlayer, locale } = userContext

  const setContextHandler = () => {
    setUserContext({ ...userContext, adminAsPlayer: !adminAsPlayer })
  }

  const { playerMsg, adminMsg } = i18n(locale, 'week') as LocaleType

  return (
    <div className="admin-switch-container">
      <div className="admin-greeting-container">{adminAsPlayer ? playerMsg : adminMsg}</div>
      <label className="switch">
        <Input type="checkbox" checked={adminAsPlayer} onChange={setContextHandler} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}
