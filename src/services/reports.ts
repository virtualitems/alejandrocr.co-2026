export type Report = {
  id: number
  person: {
    name: string
  }
  observations: string
  evidence: string
  created_at: string
}

export type CreateReportData = {
  person_id: number
  observations: string
  evidence: File
}

type ListReportResponse = {
  data: Report[]
}

export class ReportsService {
  async create(data: CreateReportData): Promise<void> {
    const formData = new FormData()
    formData.append('person_id', data.person_id.toString())
    formData.append('observations', data.observations)
    formData.append('evidence', data.evidence, 'evidence.jpg')

    const response = await fetch('https://demo.alejandrocr.co/api/reports', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }
  }

  async getAll(): Promise<Report[]> {
    const response = await fetch('https://demo.alejandrocr.co/api/reports')

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ListReportResponse = await response.json()
    return result.data
  }

  async getByPersonId(personId: number): Promise<Report[]> {
    const response = await fetch(`https://demo.alejandrocr.co/api/reports?person_id=${personId}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ListReportResponse = await response.json()
    return result.data
  }

  async delete(reportId: number): Promise<void> {
    const response = await fetch(`https://demo.alejandrocr.co/api/reports/${reportId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  }
}
