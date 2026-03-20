/*
API Layer for quants
This file is pure backend API calls, no UI logic will be here
*/

export type Quant = {
    id: number
    name: string
    created_at: string
}

// Implement the function to fetch quants from the backend API
export async function getQuants(): Promise<Quant[]> {}
export async function createQuant(name: string): Promise<Quant> {}
export async function updateQuant(id: number, name: string): Promise<Quant> {}
export async function deleteQuant(id: number): Promise<void> {}
