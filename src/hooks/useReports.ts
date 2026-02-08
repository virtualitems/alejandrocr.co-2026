import { useState, useEffect, useCallback, useRef } from 'react'
import { ReportsService, type Report } from '../services/reports'

export function useReports(personId?: number) {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const reportsService = useRef(new ReportsService())

  const fetchReports = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await reportsService.current.getAll(personId)
      setReports(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch reports'
      setError(message)
      console.error('Error fetching reports:', err)
    } finally {
      setIsLoading(false)
    }
  }, [personId])

  const deleteReport = useCallback(async (id: number) => {
    try {
      await reportsService.current.delete(id)
      setReports((prev) => prev.filter((report) => report.id !== id))
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete report'
      setError(message)
      console.error('Error deleting report:', err)
      return false
    }
  }, [])

  const refreshReports = useCallback(() => {
    fetchReports()
  }, [fetchReports])

  useEffect(() => {
    fetchReports()
  }, [fetchReports])

  return {
    reports,
    isLoading,
    error,
    deleteReport,
    refreshReports
  }
}
