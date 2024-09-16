import moment from 'moment/moment'
import { useDispatch, useSelector } from 'react-redux'

import { Locale, i18n } from '../../locale'
import { selectEditor, selectUser } from '../../redux/selectors'
import { editorActions } from '../../redux/slices'
import { Input } from '../../ui'

export const EditorActivities = () => {
  const dispatch = useDispatch()
  const { active, deadline } = useSelector(selectEditor)
  const { locale } = useSelector(selectUser)

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const deadline = new Date(value).getTime()
    dispatch(editorActions.updateEditorDeadline(deadline))
  }

  const handleChangeActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    dispatch(editorActions.updateEditorWeekActivity(checked))
  }

  const { weekActivityMsg } = i18n(locale, 'editor') as Locale

  const getDeadline = (deadline: number) => moment(deadline).format().substring(0, 16)

  return (
    <div className="flex flex-row gap-1">
      <Input type="datetime-local" value={getDeadline(deadline)} className="pointer" onChange={handleChangeDate} />

      <div className="flex gap-2 items-center min-w-28 px-2 border border-gray-400 rounded-lg h-10">
        <span className="flex items-center">{weekActivityMsg}</span>
        <Input type="checkbox" checked={active} className="pointer h-5" onChange={handleChangeActivity} />
      </div>
    </div>
  )
}
