import { useDispatch, useSelector } from 'react-redux'

import { Input } from './Input'
import { i18n } from '../locale/locale'
import { LocaleType } from '../types'
import { userActions } from '../redux/slices'
import { selectUser } from '../redux/selectors'

export const AdminPlayer = () => {
  const dispatch = useDispatch()
  const { adminAsPlayer, locale } = useSelector(selectUser)

  const switchHandler = () => {
    dispatch(userActions.setAdminAsPlayer(!adminAsPlayer))
  }

  const { playerMsg, adminMsg } = i18n(locale, 'week') as LocaleType

  return (
    <div className="admin-switch-container">
      <div className="admin-greeting-container">{adminAsPlayer ? playerMsg : adminMsg}</div>
      <label className="switch">
        <Input type="checkbox" checked={adminAsPlayer} onChange={switchHandler} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}
