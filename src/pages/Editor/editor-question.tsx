import { FaBan, FaEdit, FaTrashAlt } from 'react-icons/fa'
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

  const triggerFade = useFade(questionsRef)

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
    <div className="flex flex-row gap-1 items-center p-1.5 rounded-md border border-gray-400">
      <div className="flex items-center grow text-sm leading-4">
        {questionText}: {total}
      </div>
      <div className="flex flex-row gap-1 ">
        {id === questionInWork.id ? (
          <FaBan
            className="p-1 pointer text-gray-700 border rounded-md border-gray-300 hover:text-green-700 active:text-green-800"
            onClick={handleClearQuestion}
          />
        ) : (
          <FaEdit
            className="p-0.5 text-[24px] text-gray-700 pointer hover:text-green-700 active:text-green-800"
            onClick={() => handleEditQuestion(id)}
          />
        )}
        <FaTrashAlt
          className="p-0.5 text-[24px] text-gray-700 pointer hover:text-red-700 active:text-red-800"
          onClick={() => handleDeleteQuestion(id)}
        />
      </div>
    </div>
  )
}
