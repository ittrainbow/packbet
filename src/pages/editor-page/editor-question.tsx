import { FiEdit, FiSlash, FiTrash } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

import { useFade } from '../../hooks'
import { selectApp, selectEditor, selectUser } from '../../redux/selectors'
import { editorActions } from '../../redux/slices'

type Props = { id: number; questionsRef: React.RefObject<HTMLDivElement> }

export const EditorQuestion = ({ id, questionsRef }: Props) => {
  const dispatch = useDispatch()
  const { questions, questionInWork } = useSelector(selectEditor)
  const { duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const { ru, ua, total } = questions[id]

  const { triggerFade } = useFade(questionsRef)

  const handleEditQuestion = (id: number) => {
    const question = { ru, ua, total, id }
    dispatch(editorActions.initQuestionInWork(question))
  }

  const handleDeleteQuestion = (id: number) => {
    triggerFade()
    setTimeout(() => dispatch(editorActions.deleteEditorQuestion(id)), duration)
  }

  const handleClearQuestion = () => {
    dispatch(editorActions.clearQuestionInWork())
  }

  const questionText = locale === 'ru' ? ru : ua

  return (
    <div className="flex flex-row gap-1 items-center p-2 rounded-lg border border-gray-400 bg-white bg-opacity-50 min-h-10">
      <span className="flex items-center grow text-sm leading-4">
        {questionText}: {total}
      </span>
      <div className="flex flex-row gap-2 justify-center items-center">
        {id === questionInWork.id ? (
          <button
            className="text-xl text-gray-700 border-gray-300 hover:text-red-700 active:text-green-800"
            onClick={handleClearQuestion}
          >
            <FiSlash />
          </button>
        ) : (
          <button
            className="text-xl text-gray-700 hover:text-green-700 active:text-green-800"
            onClick={() => handleEditQuestion(id)}
          >
            <FiEdit />
          </button>
        )}
        <button
          className="text-xl items-center align-middle text-gray-700 hover:text-red-700 active:text-red-800"
          onClick={() => handleDeleteQuestion(id)}
        >
          <FiTrash />
        </button>
      </div>
    </div>
  )
}
