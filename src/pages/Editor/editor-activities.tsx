import moment from 'moment/moment'
import { useDispatch, useSelector } from 'react-redux'

import { LocaleType, i18n } from '../../locale'
import { selectEditor, selectUser } from '../../redux/selectors'
import { editorActions } from '../../redux/slices'
import { ChangeInputType } from '../../types'
import { Input } from '../../ui'

export const EditorActivities = () => {
  const dispatch = useDispatch()
  const { active, deadline } = useSelector(selectEditor)
  const { locale } = useSelector(selectUser)

  const handleChangeDate = (e: ChangeInputType) => {
    const { value } = e.target
    const deadline = new Date(value).getTime()
    dispatch(editorActions.updateEditorDeadline(deadline))
  }

  const handleChangeActivity = (e: ChangeInputType) => {
    const { checked } = e.target
    dispatch(editorActions.updateEditorWeekActivity(checked))
  }

  const { weekActivityMsg } = i18n(locale, 'editor') as LocaleType

  const getDeadline = (deadline: number) => moment(deadline).format().substring(0, 16)

  return (
    <div className="editor-activities-container flexrow5">
      <div className="editor-datetime">
        <Input type="datetime-local" value={getDeadline(deadline)} className={'timer'} onChange={handleChangeDate} />
      </div>
      <div className="editor-checkbox">
        <div className="editor-checkbox__pad">{weekActivityMsg}</div>
        <Input type="checkbox" checked={active} className={'editor-checkbox__box'} onChange={handleChangeActivity} />
      </div>
    </div>
  )
}
