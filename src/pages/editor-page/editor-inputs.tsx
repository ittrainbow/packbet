import { FaCheck, FaPlus } from '@/icons'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useFade } from '@/hooks'
import { i18n } from '@/locale'
import { selectApp, selectEditor, selectLocation, selectUser } from '@/redux/selectors'
import { editorActions } from '@/redux/slices'
import { Button, Input } from '@/ui'
import { getNewQuestionId, getObjectsEquality } from '@/utils'

export function EditorInputs({ questionsRef }: { questionsRef: React.RefObject<HTMLDivElement> }) {
  const dispatch = useDispatch()
  const nameRef = useRef<HTMLInputElement>(null)
  const { duration, tabActive } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const editor = useSelector(selectEditor)
  const { pathname } = useSelector(selectLocation)
  const { name, questionInWork, questionCompare } = editor
  const { ru, ua, by = '', total, id } = questionInWork

  const { triggerFade } = useFade(questionsRef)

  useEffect(() => {
    pathname.includes('/editor/') && tabActive === 5 && nameRef.current?.focus()
    // eslint-disable-next-line
  }, [pathname])

  const questionButtonDisabled = getObjectsEquality(questionInWork, questionCompare)
  const totalBtnDisabled = !(!!ru.length && !!ua.length && !!by.length) || !total || questionButtonDisabled

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    dispatch(editorActions.updateEditorName(value))
  }

  const handleSetLang = (key: 'ru' | 'ua' | 'by') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.substring(0, 120)
    dispatch(editorActions.setQuestionInWork({ ...questionInWork, [key]: value }))
  }

  const handleChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const data = { ...questionInWork, total: value }

    dispatch(editorActions.setQuestionInWork(data))
  }

  const handleAddQuestion = () => {
    const { questions } = editor
    if (ru && ua && by && total) {
      triggerFade()
      const setId = typeof id !== 'number' ? getNewQuestionId(questions) : id
      setTimeout(() => dispatch(editorActions.updateEditorQuestions(setId)), duration)
    }
  }

  const { weekNameMsg, weekTotalMsg, weekQuestionRuMsg, weekQuestionUaMsg, weekQuestionByMsg } = i18n(locale, 'editor')

  return (
    <div className="editor-input">
      <Input onChange={handleChangeName} inputRef={nameRef} placeholder={weekNameMsg} value={name} />
      <div className="grid grid-cols-[1fr,4rem] gap-2 py-2">
        <Input onChange={handleSetLang('ru')} placeholder={weekQuestionRuMsg} value={ru} />
        <Input onChange={handleChangeTotal} value={total} placeholder={weekTotalMsg} className="text-center p-2" />
        <Input onChange={handleSetLang('ua')} placeholder={weekQuestionUaMsg} value={ua} />
        <div className="w-16" />
        <Input onChange={handleSetLang('by')} placeholder={weekQuestionByMsg} value={by} className="grow" />
        <Button
          className="w-16 flex items-center justify-center"
          onClick={handleAddQuestion}
          disabled={totalBtnDisabled}
          icon={id !== null ? <FaCheck /> : <FaPlus />}
        />
      </div>
    </div>
  )
}
