import { useEffect, useState } from "react"
import type { Quant } from "../api/quants"
import {
  getQuants,
  createQuant,
  updateQuant,
  deleteQuant,
} from "../api/quants"

import QuantForm from "../components/QuantForm"
import QuantTable from "../components/QuantTable"

/*
The brain of the page
Holds state, calls API, and passes data/handlers
to components
*/

export default function QuantsPage() {
  const [quants, setQuants] = useState<Quant[]>([])
  const [editingQuant, setEditingQuant] = useState<Quant | null>(null)

  // Load all quants
  async function loadQuants() {
    const data = await getQuants()
    setQuants(data)
  }

  useEffect(() => {
    loadQuants()
  }, [])

  // Create
  async function handleCreate(name: string) {
    await createQuant(name)
    await loadQuants()
  }

  // Enter edit mode
  function handleEdit(quant: Quant) {
    setEditingQuant(quant)
  }

  // Update
  async function handleUpdate(name: string) {
    if (!editingQuant) return

    await updateQuant(editingQuant.id, name)
    setEditingQuant(null)
    await loadQuants()
  }

  // Delete
  async function handleDelete(id: number) {
    await deleteQuant(id)
    await loadQuants()
  }

  return (
    <div>
      <h1>Quants</h1>

      <QuantForm
        onSubmit={editingQuant ? handleUpdate : handleCreate}
        initialValue={editingQuant?.name}
        isEditing={!!editingQuant}
      />

      <QuantTable
        quants={quants}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}