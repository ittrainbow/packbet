import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import 'react-confirm-alert/src/react-confirm-alert.css'

import { EditorActivities, EditorInputs, EditorQuestion } from '.'
import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectEditor, selectLocation, selectUser, selectWeeks } from '../../redux/selectors'
import { appActions, editorActions, weeksActions } from '../../redux/slices'
import * as TYPES from '../../redux/storetypes'
import { Button, DeleteModal } from '../../ui-elements'
import { getWeeksEquality, getWeeksIDs } from '../../utils'

export const EditorPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const weeks = useSelector(selectWeeks)
  const editor = useSelector(selectEditor)
  const { selectedWeek, emptyEditor } = useSelector(selectApp)
  const { pathname } = useSelector(selectLocation)
  const { locale } = useSelector(selectUser)
  const { tabActive, durationShort } = useSelector(selectApp)
  const { questions, name } = editor
  const questionsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const triggerFade = useFade(containerRef)

  useEffect(() => {
    const conditions =
      tabActive < 5 || (pathname === '/editor' && tabActive === 5) || (pathname.includes('/editor/') && tabActive === 6)

    conditions && triggerFade()
    // eslint-disable-next-line
  }, [tabActive])

  useEffect(() => {
    if (tabActive === 6) {
      dispatch(editorActions.clearQuestionInWork())
      setTimeout(() => dispatch(editorActions.clearEditor()), durationShort)
    }
    // eslint-disable-next-line
  }, [tabActive])

  const changes = emptyEditor ? !!Object.keys(questions).length : !getWeeksEquality(editor, weeks[selectedWeek])
  const saveBtnDisabled = !changes || !name || !Object.keys(questions).length

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
    deleter()
  }

  const handleCancelEditor = () => {
    dispatch(appActions.setEditorAndTab())
    triggerFade()
    setTimeout(() => {
      dispatch(editorActions.clearEditor())
      navigate('/calendar')
    }, durationShort)
  }

  const { editorTitleMsg } = i18n(locale, 'editor') as Locale
  const { buttonSaveMsg, buttonCancelMsg, buttonDeleteWeekMsg } = i18n(locale, 'buttons') as Locale

  return (
    <div className="p-4 max-w-[32rem] animate-fade-in-up" ref={containerRef}>
      <span className="mb-2 flex font-bold grow items-center gap-1 ">{editorTitleMsg}</span>
      <EditorInputs questionsRef={questionsRef} />

      <div ref={questionsRef} className="flex flex-col gap-2">
        {Object.keys(questions).map((el) => (
          <EditorQuestion key={el} id={Number(el)} questionsRef={questionsRef} />
        ))}
        <hr className="h-px bg-gray-400 border-0" />
        <EditorActivities />
        <div className="flex flex-col items-center gap-2">
          <Button disabled={saveBtnDisabled} onClick={handleSubmit} text={buttonSaveMsg} />
          <Button onClick={handleCancelEditor} text={buttonCancelMsg} />
          {pathname.includes('editor/') && <Button onClick={() => setModalOpen(true)} text={buttonDeleteWeekMsg} />}
        </div>
      </div>
      <DeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} onConfirm={handleDeleteWeek} />
    </div>
  )
}
