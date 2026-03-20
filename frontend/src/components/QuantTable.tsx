/*
No API calls here, just UI logic for displaying 
and managing the list of quants
Will render a table of quants with edit/delete buttons
*/

import { Quant } from "../api/quants"

type QuantTableProps = {
  quants: Quant[]
  onEdit: (quant: Quant) => void
  onDelete: (id: number) => void
}