/*
API Layer for quants
This file is pure backend API calls, no UI logic will be here
*/

export type Quant = {
  id: number
  name: string
  created_at: string
}

const BASE_URL = "http://backend:8000"

// GET all quants
export async function getQuants(): Promise<Quant[]> {
  const res = await fetch(`${BASE_URL}/quants`)

  if (!res.ok) {
    throw new Error("Failed to fetch quants")
  }

  return res.json()
}

// CREATE a quant
export async function createQuant(name: string): Promise<Quant> {
  const res = await fetch(`${BASE_URL}/quants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) {
    throw new Error("Failed to create quant")
  }

  return res.json()
}

// UPDATE a quant
export async function updateQuant(id: number, name: string): Promise<Quant> {
  const res = await fetch(`${BASE_URL}/quants/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  })

  if (!res.ok) {
    throw new Error("Failed to update quant")
  }

  return res.json()
}

// DELETE a quant
export async function deleteQuant(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/quants/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error("Failed to delete quant")
  }
}