import { i18n } from '@/locale'
import { selectUser } from '@/redux/selectors'
import { Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '.'

type Props = {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
}

export function DeleteModal({ modalOpen, setModalOpen, onConfirm }: Props) {
  const { locale } = useSelector(selectUser)
  const { buttonDeleteYesMsg, buttonDeleteNoMsg } = i18n(locale, 'buttons')
  const { weekDeleteTitle, weekDeleteMsg } = i18n(locale, 'editor')

  if (!modalOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => setModalOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="w-full max-w-sm rounded-xl border border-ink/20 bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="alert-dialog-title" className="text-base font-bold">
          {weekDeleteTitle}
        </h2>
        <p id="alert-dialog-description" className="mt-2 text-sm text-ink-muted">
          {weekDeleteMsg}
        </p>
        <div className="mt-4 flex gap-2">
          <Button onClick={() => setModalOpen(false)} text={buttonDeleteNoMsg} />
          <Button onClick={onConfirm} text={buttonDeleteYesMsg} />
        </div>
      </div>
    </div>
  )
}
