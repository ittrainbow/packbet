import { useEffect, useRef } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { useFade } from '../../hooks'
import { Locale, i18n } from '../../locale'
import { selectApp, selectEditor, selectLocation, selectUser } from '../../redux/selectors'
import { editorActions } from '../../redux/slices'
import { ChangeInput, FadeRef } from '../../types'
import { Button, Input } from '../../ui'
import { getNewQuestionId, getObjectsEquality } from '../../utils'

export const EditorInputs = ({ questionsRef }: { questionsRef: FadeRef }) => {
  const dispatch = useDispatch()
  const nameRef = useRef<HTMLInputElement>()
  const { duration, tabActive } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const editor = useSelector(selectEditor)
  const { pathname } = useSelector(selectLocation)
  const { name, questionInWork, questionCompare } = editor
  const { ru, ua, total, id } = questionInWork

  const triggerFade = useFade(questionsRef)

  // helpers

  useEffect(() => {
    pathname.includes('/editor/') && tabActive === 5 && nameRef.current?.focus()
    // eslint-disable-next-line
  }, [pathname])

  const questionButtonDisabled = getObjectsEquality(questionInWork, questionCompare)
  const totalBtnDisabled = !(!!ru.length && !!ua.length) || !total || questionButtonDisabled

  // action handlers

  const handleChangeName = (e: ChangeInput) => {
    const { value } = e.target
    dispatch(editorActions.updateEditorName(value))
  }

  const handleSetRu = (e: ChangeInput) => {
    const { value } = e.target
    const ru = value.substring(0, 120)
    const data = { ...questionInWork, ru }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleSetUa = (e: ChangeInput) => {
    const { value } = e.target
    const ua = value.substring(0, 120)
    const data = { ...questionInWork, ua }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleChangeTotal = (e: ChangeInput) => {
    const { value } = e.target
    const data = { ...questionInWork, total: value }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleAddQuestion = () => {
    const { questions } = editor
    if (ru && ua && total) {
      triggerFade()
      const setId = id === (null || undefined) ? getNewQuestionId(questions) : (id as number)
      setTimeout(() => dispatch(editorActions.updateEditorQuestions(setId)), duration)
    }
  }

  // render styles and locales

  const { weekNameMsg, weekTotalMsg, weekQuestionRuMsg, weekQuestionUaMsg } = i18n(locale, 'editor') as Locale

  return (
    <div className="editor-input">
      <Input onChange={handleChangeName} inputRef={nameRef} placeholder={weekNameMsg} value={name} />
      <div className="editor-form">
        <div className="editor-form__inner flexrow5">
          <Input onChange={handleSetRu} placeholder={weekQuestionRuMsg} value={ru} />
          <Input onChange={handleChangeTotal} value={total} type="number" placeholder={weekTotalMsg} />
        </div>
        <div className="editor-form__inner flexrow5">
          <Input onChange={handleSetUa} placeholder={weekQuestionUaMsg} value={ua} />
          <Button className="editor-small" onClick={handleAddQuestion} disabled={totalBtnDisabled} minWidth={66}>
            {id !== null ? <FaCheck /> : <FaPlus />}
          </Button>
        </div>
      </div>
    </div>
  )
}
