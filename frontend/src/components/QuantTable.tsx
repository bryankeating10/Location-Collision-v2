import type { Quant } from "../api/quants"

type QuantTableProps = {
  quants: Quant[]
  onEdit: (quant: Quant) => void
  onDelete: (id: number) => void
}

export default function QuantTable({
  quants,
  onEdit,
  onDelete,
}: QuantTableProps) {
  if (quants.length === 0) {
    return <p>No quants yet.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {quants.map((quant) => (
          <tr key={quant.id}>
            <td>{quant.name}</td>
            <td>
              <button onClick={() => onEdit(quant)}>Edit</button>
              <button onClick={() => onDelete(quant.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}