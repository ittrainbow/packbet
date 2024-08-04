import { useEffect, useRef } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import 'react-confirm-alert/src/react-confirm-alert.css'

import { EditorActivities, EditorInputs, EditorQuestion } from '.'
import { useFade } from '../../hooks'
import { LocaleType, i18n } from '../../locale'
import { selectApp, selectEditor, selectLocation, selectUser, selectWeeks } from '../../redux/selectors'
import { appActions, editorActions, weeksActions } from '../../redux/slices'
import * as TYPES from '../../redux/storetypes'
import { Button } from '../../ui'
import { getWeeksEquality, getWeeksIDs } from '../../utils'

export const EditorPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const weeks = useSelector(selectWeeks)
  const editor = useSelector(selectEditor)
  const { selectedWeek, emptyEditor } = useSelector(selectApp)
  const { pathname } = useSelector(selectLocation)
  const { locale } = useSelector(selectUser)
  const { tabActive, duration } = useSelector(selectApp)
  const { questions, name } = editor
  const questionsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    const fromUserTabsToEmpty = !pathname.includes('editor') && tabActive === 6
    const fromListToEmpty = pathname.includes('editor/') && tabActive !== 5
    const conditions = tabActive < 5 || fromUserTabsToEmpty || fromListToEmpty

    conditions && triggerFade()
    // eslint-disable-next-line
  }, [tabActive])

  useEffect(() => {
    if (tabActive === 6) {
      dispatch(editorActions.clearQuestionInWork())
      setTimeout(() => dispatch(editorActions.clearEditor()), duration)
    }
    // eslint-disable-next-line
  }, [tabActive])

  const changes = emptyEditor ? !!Object.keys(questions).length : !getWeeksEquality(editor, weeks[selectedWeek])
  const saveBtnDisabled = !changes || !name || !Object.keys(questions).length

  // action handlers

  const handleSubmit = async () => {
    const id = selectedWeek
    const { questions, name, active, deadline } = editor
    const { nextWeek, currentWeek } = getWeeksIDs(weeks)
    const newSelectedWeek = selectedWeek ? selectedWeek + 1 : 0
    navigate('/calendar')
    dispatch(appActions.setTabActive(5))
    dispatch({ type: TYPES.SUBMIT_WEEK, payload: { id, week: { questions, name, active, deadline } } })
    dispatch(appActions.submitWeek({ nextWeek, currentWeek, newSelectedWeek }))
    dispatch(weeksActions.updateWeeks({ week: editor, id }))
  }

  const handleDeleteWeek = () => {
    const deleter = async () => {
      dispatch({ type: TYPES.DELETE_WEEK, payload: selectedWeek })
      dispatch(weeksActions.deleteWeek(selectedWeek))
      dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
      navigate('/calendar')
    }

    confirmAlert({
      message: weekDeleteMsg,
      buttons: [{ label: buttonDeleteYesMsg, onClick: async () => deleter() }, { label: buttonDeleteNoMsg }]
    })
  }

  const handleCancelEditor = () => {
    dispatch(appActions.setEditorAndTab())
    triggerFade()
    setTimeout(() => {
      dispatch(editorActions.clearEditor())
      navigate('/calendar')
    }, duration)
  }

  // render styles and locales

  const { weekDeleteMsg, editorTitleMsg } = i18n(locale, 'editor') as LocaleType
  const { buttonSaveMsg, buttonCancelMsg, buttonDeleteWeekMsg, buttonDeleteYesMsg, buttonDeleteNoMsg } = i18n(
    locale,
    'buttons'
  ) as LocaleType

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <div className="title flexrow5">
        <div className="title__name bold">{editorTitleMsg}</div>
      </div>
      <EditorInputs questionsRef={questionsRef} />

      <div ref={questionsRef}>
        {Object.keys(questions).map((el) => (
          <EditorQuestion key={el} id={Number(el)} questionsRef={questionsRef} />
        ))}
        <hr />
        <EditorActivities />
        <div className="editor-form">
          <Button disabled={saveBtnDisabled} onClick={handleSubmit}>
            {buttonSaveMsg}
          </Button>
          <Button onClick={handleCancelEditor}>{buttonCancelMsg}</Button>
          {pathname.includes('editor/') && <Button onClick={handleDeleteWeek}>{buttonDeleteWeekMsg}</Button>}
        </div>
      </div>
    </div>
  )
}
