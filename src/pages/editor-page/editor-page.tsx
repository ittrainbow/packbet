import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { useFade, usePageFadeClass } from '@/hooks'
import { i18n } from '@/locale'
import { selectApp, selectEditor, selectLocation, selectUser, selectWeeks } from '@/redux/selectors'
import { appActions, editorActions, weeksActions } from '@/redux/slices'
import * as TYPES from '@/redux/storetypes'
import { Button, DeleteModal } from '@/ui'
import { getWeeksEquality, getWeeksIDs } from '@/utils'
import clsx from 'clsx'
import { toast, ToastContainer } from 'react-toastify'
import { EditorActivities, EditorInputs, EditorQuestion } from '.'

export function EditorPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const weeks = useSelector(selectWeeks)
  const editor = useSelector(selectEditor)
  const { selectedWeek, emptyEditor } = useSelector(selectApp)
  const { pathname } = useSelector(selectLocation)
  const { locale } = useSelector(selectUser)
  const fadeClass = usePageFadeClass()
  const { tabActive, duration } = useSelector(selectApp)
  const { questions, name } = editor
  const questionsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const { triggerFade } = useFade(containerRef)

  useEffect(() => {
    if (tabActive === 6) {
      dispatch(editorActions.clearQuestionInWork())
      setTimeout(() => dispatch(editorActions.clearEditor()), duration)
    }
    // eslint-disable-next-line
  }, [tabActive])

  const week = weeks[selectedWeek]
  const changes = emptyEditor || !week ? !!Object.keys(questions).length : !getWeeksEquality(editor, week)
  const saveBtnDisabled = !changes || !name || !Object.keys(questions).length

  const { successMsg, failureMsg } = i18n(locale, 'week')

  const handleSubmit = async () => {
    const isNewWeek = isNaN(Number(location.pathname.split('/').at(-1)))

    const id = selectedWeek

    const { questions, name, active, deadline } = editor
    const { nextWeek, currentWeek } = getWeeksIDs(weeks)
    const newSelectedWeek = isNewWeek ? nextWeek : selectedWeek
    const saveSuccess = () => {
      toast.success(successMsg)
      if (isNewWeek) navigate(`/editor/${nextWeek}`)
    }
    const saveFailure = () => toast.error(failureMsg)
    const toaster = (success: boolean) => (success ? saveSuccess() : saveFailure())

    dispatch(appActions.setTabActive(5))
    dispatch({
      type: TYPES.SUBMIT_WEEK,
      payload: { id, toaster, isNewWeek, week: { questions, name, active, deadline } }
    })
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
    }, duration)
  }

  const { editorTitleMsg } = i18n(locale, 'editor')
  const { buttonSaveMsg, buttonCancelMsg, buttonDeleteWeekMsg } = i18n(locale, 'buttons')

  return (
    <div className={clsx('px-4 py-5 max-w-[32rem] grid gap-3', fadeClass)} ref={containerRef} id="container">
      <div className="flex items-center h-6">
        <span className="font-bold text-base leading-6">{editorTitleMsg}</span>
      </div>
      <EditorInputs questionsRef={questionsRef} />

      <div ref={questionsRef} className="flex flex-col gap-2">
        {Object.keys(questions).map((el) => (
          <EditorQuestion key={el} id={Number(el)} questionsRef={questionsRef} />
        ))}
        <hr className="h-px bg-ink/20 border-0" />
        <EditorActivities />
        <div className="flex flex-col items-center gap-2">
          <Button disabled={saveBtnDisabled} onClick={handleSubmit} text={buttonSaveMsg} />
          <Button onClick={handleCancelEditor} text={buttonCancelMsg} />
          {pathname.includes('editor/') && <Button onClick={() => setModalOpen(true)} text={buttonDeleteWeekMsg} />}
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={duration * 12} theme="colored" pauseOnHover={false} />
      <DeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} onConfirm={handleDeleteWeek} />
    </div>
  )
}
