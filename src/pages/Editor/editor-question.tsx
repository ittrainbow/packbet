import { FaBan, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { useFade } from '../../hooks'
import { selectApp, selectEditor, selectUser } from '../../redux/selectors'
import { editorActions } from '../../redux/slices'
import { FadeRef } from '../../types'

type Props = { id: number; questionsRef: FadeRef }

export const EditorQuestion = ({ id, questionsRef }: Props) => {
  const dispatch = useDispatch()
  const { questions, questionInWork } = useSelector(selectEditor)
  const { duration } = useSelector(selectApp)
  const { locale } = useSelector(selectUser)
  const { ru, ua, total } = questions[id]

  const triggerFade = useFade(questionsRef)

  // action handlers

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
    <div className="editor-question flexrow5">
      <div className="editor-question__desc">
        {questionText}: {total}
      </div>
      <div className="flexrow5">
        {id === questionInWork.id ? (
          <FaBan className="editor-question__edit editor-btn__green faBan" onClick={handleClearQuestion} />
        ) : (
          <FaEdit className="editor-question__edit editor-btn__green" onClick={() => handleEditQuestion(id)} />
        )}
        <FaTrashAlt className="editor-question__trash editor-btn__red" onClick={() => handleDeleteQuestion(id)} />
      </div>
    </div>
  )
}
