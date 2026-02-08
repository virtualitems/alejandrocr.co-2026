const API_BASE_URL = 'https://ia.allup.com.co'

export type Person = {
  id?: number
  name: string
  email: string
  created_at?: string
  updated_at?: string | null
  deleted_at?: string | null
}

export type PersonCreate = {
  name: string
  email: string
}

export type PersonUpdate = {
  name?: string
  email?: string
}

export class PersonsService {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  /**
   * Obtiene todas las personas
   */
  async getAll(): Promise<Person[]> {
    const response = await fetch(`${this.baseUrl}/persons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch persons: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Obtiene una persona por ID
   */
  async getById(id: number): Promise<Person> {
    const response = await fetch(`${this.baseUrl}/persons/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Person not found')
      }
      throw new Error(`Failed to fetch person: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Crea una nueva persona
   */
  async create(person: PersonCreate): Promise<Person> {
    const response = await fetch(`${this.baseUrl}/persons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Email already exists')
      }
      throw new Error(`Failed to create person: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Actualiza una persona existente
   */
  async update(id: number, person: PersonUpdate): Promise<Person> {
    const response = await fetch(`${this.baseUrl}/persons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Person not found')
      }
      if (response.status === 400) {
        throw new Error('Email already exists or no fields to update')
      }
      throw new Error(`Failed to update person: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Elimina una persona (soft delete)
   */
  async delete(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/persons/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Person not found')
      }
      throw new Error(`Failed to delete person: ${response.statusText}`)
    }
  }
}

// Export singleton instance
export const personsService = new PersonsService()
