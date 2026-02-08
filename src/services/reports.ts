export type Report = {
  id: number
  person_id: number
  observations: string
  evidence: string
  created_at: string
  deleted_at: string | null
}

export type CreateReportData = {
  person_id: number
  observations: string
  evidence: File
}

type SingleReportResponse = {
  data: Report
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

  async create(data: CreateReportData): Promise<Report> {
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

    const result: SingleReportResponse = await response.json()
    return result.data
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

  async getById(id: number): Promise<Report> {
    const response = await fetch(`${this.baseUrl}/${id}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result: SingleReportResponse = await response.json()
    return result.data
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  }
}
