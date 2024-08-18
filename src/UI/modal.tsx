import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/'
import { useSelector } from 'react-redux'
import { Button } from '.'
import { i18n, Locale } from '../locale'
import { selectUser } from '../redux/selectors'

type Props = {
  modalOpen: boolean
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  onConfirm: () => void
}

export const DeleteModal = ({ modalOpen, setModalOpen, onConfirm }: Props) => {
  const { locale } = useSelector(selectUser)
  const { buttonDeleteYesMsg, buttonDeleteNoMsg } = i18n(locale, 'buttons') as Locale
  const { weekDeleteTitle, weekDeleteMsg } = i18n(locale, 'editor') as Locale

  return (
    <Dialog
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="bg-opacity-50"
    >
      <DialogTitle id="alert-dialog-title">{weekDeleteTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{weekDeleteMsg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setModalOpen(false)} text={buttonDeleteNoMsg} />
        <Button onClick={onConfirm} text={buttonDeleteYesMsg} />
      </DialogActions>
    </Dialog>
  )
}
