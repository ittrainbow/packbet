import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'
import { useNavigate } from 'react-router-dom'

import 'react-confirm-alert/src/react-confirm-alert.css'

import { selectApp, selectEditor, selectLocation, selectUser, selectWeeks } from '../../redux/selectors'
import { getObjectsEquality, getWeeksIDs, animateFadeOut } from '../../helpers'
import { appActions, editorActions, weeksActions } from '../../redux/slices'
import { EditorActivities, EditorInputs, EditorQuestion } from '.'
import * as TYPES from '../../redux/storetypes'
import { LocaleType } from '../../types'
import { i18n } from '../../locale'
import { Button } from '../../UI'

export const Editor = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const weeks = useSelector(selectWeeks)
  const editor = useSelector(selectEditor)
  const { selectedWeek, emptyEditor } = useSelector(selectApp)
  const { pathname } = useSelector(selectLocation)
  const { locale } = useSelector(selectUser)
  const { tabActive, duration } = useSelector(selectApp)
  const { questions, name, active, deadline } = editor
  const questionsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [anyChanges, setAnyChanges] = useState<boolean>(false)

  // container fade animations

  useEffect(() => {
    const fromEditListToEmpty = pathname.length > 7 && tabActive === 6
    const fromEmptyToEditList = pathname.length < 8 && tabActive === 5
    const editorInnerSwitch = fromEditListToEmpty || fromEmptyToEditList
    editorInnerSwitch && animateFadeOut(containerRef)
  }, [pathname, tabActive])

  // helpers

  useEffect(() => {
    const changes = emptyEditor ? !!Object.keys(questions).length : !getObjectsEquality(editor, weeks[selectedWeek])
    setAnyChanges(changes)
    // eslint-disable-next-line
  }, [questions, name, active, deadline])

  useEffect(() => {
    if (tabActive === 6) {
      dispatch(editorActions.clearQuestionInWork())
      setTimeout(() => dispatch(editorActions.clearEditor()), duration)
    } else if (tabActive < 5) {
      animateFadeOut(containerRef)
    } // eslint-disable-next-line
  }, [tabActive])

  const saveBtnDisabled = !anyChanges || !name || !Object.keys(questions).length

  // action handlers

  const handleSubmit = async () => {
    const id = selectedWeek
    dispatch({ type: TYPES.SUBMIT_WEEK, payload: { id, week: editor } })
    dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
    dispatch(weeksActions.updateWeeks({ week: editor, id }))
    dispatch(appActions.setSelectedWeek(selectedWeek ? selectedWeek + 1 : 0))
    navigate('/calendar')
  }

  const handleDeleteWeek = () => {
    const deleter = async () => {
      const newWeeks = structuredClone(weeks)
      delete newWeeks[selectedWeek]
      dispatch({ type: TYPES.DELETE_WEEK, payload: selectedWeek })
      dispatch(weeksActions.setWeeks(newWeeks))
      dispatch(appActions.setNextAndCurrentWeeks(getWeeksIDs(weeks)))
      navigate('/calendar')
    }

    confirmAlert({
      message: weekDeleteMsg,
      buttons: [{ label: buttonDeleteYesMsg, onClick: async () => deleter() }, { label: buttonDeleteNoMsg }]
    })
  }

  const handleCancelEditor = () => {
    dispatch(appActions.setEmptyEditor(false))
    dispatch(appActions.setTabActive(5))

    animateFadeOut(containerRef)
    setTimeout(() => {
      dispatch(editorActions.clearEditor())
      navigate('/calendar')
    }, duration)
  }

  // render styles and locales

  const { weekDeleteMsg } = i18n(locale, 'editor') as LocaleType
  const { buttonSaveMsg, buttonCancelMsg, buttonDeleteWeekMsg, buttonDeleteYesMsg, buttonDeleteNoMsg } = i18n(
    locale,
    'buttons'
  ) as LocaleType

  return (
    <div className="container animate-fade-in-up" ref={containerRef}>
      <EditorInputs questionsRef={questionsRef} />

      <div className="animate-fade-in-up" ref={questionsRef}>
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
