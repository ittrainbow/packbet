import { Input } from '../../UI'
import { useSelector, useDispatch } from 'react-redux'
import { editorActions } from '../../redux/slices'
import { selectEditor, selectUser } from '../../redux/selectors'
import moment from 'moment/moment'
import { i18n } from '../../locale'
import { ChangeInputType, LocaleType } from '../../types'

export const EditorActivities = () => {
  const dispatch = useDispatch()
  const { active, deadline } = useSelector(selectEditor)
  const { locale } = useSelector(selectUser)

  const changeDateHandler = (e: ChangeInputType) => {
    const { value } = e.target
    const deadline = new Date(value).getTime()
    dispatch(editorActions.updateEditorDeadline(deadline))
  }

  const changeActivityHandler = (e: ChangeInputType) => {
    const { checked } = e.target
    dispatch(editorActions.updateEditorActive(checked))
  }

  const getDeadline = () => {
    return moment(deadline || new Date().getTime())
      .format()
      .substring(0, 16)
  }

  const { weekActivityMsg } = i18n(locale, 'editor') as LocaleType

  return (
    <>
      <div className="editor-checkbox">
        <div className="editor-checkbox__pad">{weekActivityMsg}</div>
        <Input type="checkbox" checked={active} className={'checkbox'} onChange={changeActivityHandler} />
      </div>
      <div className="editor-datetime__container">
        <Input type="datetime-local" value={getDeadline()} className={'timer'} onChange={changeDateHandler} />
      </div>
    </>
  )
}
