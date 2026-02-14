import { useState, useRef, useCallback } from 'react'
import { ReportsService } from '../services/reports'

export type CreateReportData = {
  person_id: number
  observations: string
  evidence: File
}

export type UseReportCreationReturn = {
  isCreating: boolean
  createReport: (data: CreateReportData) => Promise<void>
}

export function useReportCreation(): UseReportCreationReturn {
  const [isCreating, setIsCreating] = useState(false)
  const reportsService = useRef(new ReportsService())

  const createReport = useCallback(async (data: CreateReportData) => {
    setIsCreating(true)
    try {
      await reportsService.current.create(data)
    } catch (error) {
      console.error('Error creating report:', error)
      throw error
    } finally {
      setIsCreating(false)
    }
  }, [])

  return {
    isCreating,
    createReport
  }
}
