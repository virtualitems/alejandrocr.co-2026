import { useState, useEffect, useCallback } from 'react'
import { personsService, type Person, type PersonCreate, type PersonUpdate } from '../services/persons'

export type UsePersonsResult = {
  persons: Person[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  create: (person: PersonCreate) => Promise<void>
  update: (id: number, person: PersonUpdate) => Promise<void>
  remove: (id: number) => Promise<void>
}

export function usePersons(): UsePersonsResult {
  const [persons, setPersons] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await personsService.getAll()
      setPersons(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load persons'
      setError(errorMessage)
      console.error('Error loading persons:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const create = useCallback(async (person: PersonCreate) => {
    try {
      const newPerson = await personsService.create(person)
      setPersons(prev => [...prev, newPerson])
    } catch (err) {
      console.error('Error creating person:', err)
      throw err
    }
  }, [])

  const update = useCallback(async (id: number, person: PersonUpdate) => {
    try {
      const updatedPerson = await personsService.update(id, person)
      setPersons(prev => prev.map(p => p.id === id ? updatedPerson : p))
    } catch (err) {
      console.error('Error updating person:', err)
      throw err
    }
  }, [])

  const remove = useCallback(async (id: number) => {
    try {
      await personsService.delete(id)
      setPersons(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      console.error('Error deleting person:', err)
      throw err
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return {
    persons,
    loading,
    error,
    refresh,
    create,
    update,
    remove,
  }
}
