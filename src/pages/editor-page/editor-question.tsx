import { FiEdit, FiSlash, FiTrash } from '@/icons'
import { useDispatch, useSelector } from 'react-redux'

import { useFade } from '@/hooks'
import { selectApp, selectEditor, selectUser } from '@/redux/selectors'
import { editorActions } from '@/redux/slices'
import { getQuestionText } from '@/utils'

type Props = { id: number; questionsRef: React.RefObject<HTMLDivElement> }

export const EditorQuestion = ({ id, questionsRef }: Props) => {
  const dispatch = useDispatch()
  const { questions, questionInWork } = useSelector(selectEditor)
  const { duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const question = questions[id]
  const { total } = question

  const { triggerFade } = useFade(questionsRef)

  const handleEditQuestion = (id: number) => {
    dispatch(editorActions.initQuestionInWork({ ...question, id }))
  }

  const handleDeleteQuestion = (id: number) => {
    triggerFade()
    setTimeout(() => dispatch(editorActions.deleteEditorQuestion(id)), duration)
  }

  const handleClearQuestion = () => {
    dispatch(editorActions.clearQuestionInWork())
  }

  const questionText = getQuestionText(question, locale)

  return (
    <div className="flex flex-row gap-1 items-center p-2 rounded-xl border border-ink/20 bg-white min-h-10">
      <span className="flex items-center grow text-sm leading-4">
        {questionText}: {total}
      </span>
      <div className="flex flex-row gap-2 justify-center items-center">
        {id === questionInWork.id ? (
          <button
            className="text-xl text-ink-muted border-ink/20 hover:text-red-700 active:text-accent"
            onClick={handleClearQuestion}
          >
            <FiSlash />
          </button>
        ) : (
          <button
            className="text-xl text-ink-muted hover:text-accent active:text-accent"
            onClick={() => handleEditQuestion(id)}
          >
            <FiEdit />
          </button>
        )}
        <button
          className="text-xl items-center align-middle text-ink-muted hover:text-red-700 active:text-red-800"
          onClick={() => handleDeleteQuestion(id)}
        >
          <FiTrash />
        </button>
      </div>
    </div>
  )
}
