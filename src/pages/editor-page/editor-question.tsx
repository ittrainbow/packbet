import { FiEdit, FiSlash, FiTrash } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'

import { useFade } from '../../hooks'
import { selectApp, selectEditor, selectUser } from '../../redux/selectors'
import { editorActions } from '../../redux/slices'

type Props = { id: number; questionsRef: React.RefObject<HTMLDivElement> }

export const EditorQuestion = ({ id, questionsRef }: Props) => {
  const dispatch = useDispatch()
  const { questions, questionInWork } = useSelector(selectEditor)
  const { durationShort } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const { ru, ua, total } = questions[id]

  const triggerFade = useFade(questionsRef)

  const handleEditQuestion = (id: number) => {
    const question = { ru, ua, total, id }
    dispatch(editorActions.initQuestionInWork(question))
  }

  const handleDeleteQuestion = (id: number) => {
    triggerFade()
    setTimeout(() => dispatch(editorActions.deleteEditorQuestion(id)), durationShort)
  }

  const handleClearQuestion = () => {
    dispatch(editorActions.clearQuestionInWork())
  }

  const questionText = locale === 'ru' ? ru : ua

  return (
    <div className="flex flex-row gap-1 items-center p-2 rounded-md border border-gray-400 bg-white bg-opacity-50 min-h-10">
      <div className="flex items-center grow text-sm leading-4">
        {questionText}: {total}
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        {id === questionInWork.id ? (
          <FiSlash
            className="text-[20px] cursor-pointer text-gray-700 border-gray-300 hover:text-red-700 active:text-green-800"
            onClick={handleClearQuestion}
          />
        ) : (
          <FiEdit
            className="text-[20px] text-gray-700 cursor-pointer hover:text-green-700 active:text-green-800"
            onClick={() => handleEditQuestion(id)}
          />
        )}
        <FiTrash
          className="text-[20px] items-center align-middle text-gray-700 cursor-pointer hover:text-red-700 active:text-red-800"
          onClick={() => handleDeleteQuestion(id)}
        />
      </div>
    </div>
  )
}
