import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '../catalyst-ui-kit/dialog'
import { Field, Label } from '../catalyst-ui-kit/fieldset'
import { Input } from '../catalyst-ui-kit/input'
import { Button } from '../catalyst-ui-kit/button'
import { ErrorMessage } from '../catalyst-ui-kit/fieldset'
import type { Person } from '../../services/persons'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; email: string }) => Promise<void>
  person?: Person | null
  mode: 'create' | 'edit'
}

export function PersonFormDialog({ isOpen, onClose, onSubmit, person, mode }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && person) {
        setName(person.name)
        setEmail(person.email)
      } else {
        setName('')
        setEmail('')
      }
      setErrors({})
    }
  }, [isOpen, mode, person])

  const validate = () => {
    const newErrors: { name?: string; email?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    try {
      await onSubmit({ name: name.trim(), email: email.trim() })
      onClose()
    } catch (error) {
      // Error is handled by parent
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} size="md">
      <DialogTitle>{mode === 'create' ? 'Add New Person' : 'Edit Person'}</DialogTitle>
      <DialogDescription>
        {mode === 'create'
          ? 'Enter the details of the person you want to add.'
          : 'Update the person information.'}
      </DialogDescription>

      <form onSubmit={handleSubmit}>
        <DialogBody>
          <div className="space-y-6">
            <Field>
              <Label>Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                autoFocus
                disabled={isSubmitting}
                invalid={!!errors.name}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </Field>

            <Field>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                disabled={isSubmitting}
                invalid={!!errors.email}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </Field>
          </div>
        </DialogBody>

        <DialogActions>
          <Button type="button" plain onClick={handleClose} disabled={isSubmitting} className="select-none cursor-pointer">
            Cancel
          </Button>
          <Button type="submit" color="indigo" disabled={isSubmitting} className="select-none cursor-pointer">
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Add Person' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
