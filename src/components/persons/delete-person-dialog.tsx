import { Alert } from '../catalyst-ui-kit/alert'
import { DialogTitle, DialogDescription, DialogActions } from '../catalyst-ui-kit/dialog'
import { Button } from '../catalyst-ui-kit/button'
import type { Person } from '../../services/persons'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  person: Person | null
  isDeleting?: boolean
}

export function DeletePersonDialog({ isOpen, onClose, onConfirm, person, isDeleting = false }: Props) {
  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <Alert open={isOpen} onClose={isDeleting ? () => {} : onClose} size="sm">
      <DialogTitle>Delete Person</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete <strong>{person?.name}</strong>? This action cannot be undone.
      </DialogDescription>

      <DialogActions>
        <Button type="button" plain onClick={onClose} disabled={isDeleting} className="select-none cursor-pointer">
          Cancel
        </Button>
        <Button type="button" color="red" onClick={handleConfirm} disabled={isDeleting} className="select-none cursor-pointer">
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Alert>
  )
}
