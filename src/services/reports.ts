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
  private baseUrl: string

  constructor() {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)
    this.baseUrl = isLocalhost
      ? 'https://ia.allup.com.co/reports'
      : `${window.location.origin}/reports`
  }

  async create(data: CreateReportData): Promise<void> {
    const formData = new FormData()
    formData.append('person_id', data.person_id.toString())
    formData.append('observations', data.observations)
    formData.append('evidence', data.evidence, 'evidence.jpg')

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }
  }

  async getAll(personId?: number): Promise<Report[]> {
    const url = personId
      ? `${this.baseUrl}?person_id=${personId}`
      : this.baseUrl

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: ListReportResponse = await response.json()
    return result.data
  }

  async delete(reportId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${reportId}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  }
}
