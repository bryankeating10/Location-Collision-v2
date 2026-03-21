import { useState, useEffect } from "react"

type QuantFormProps = {
  onSubmit: (name: string) => void
  initialValue?: string
  isEditing?: boolean
}

export default function QuantForm({
  onSubmit,
  initialValue = "",
  isEditing = false,
}: QuantFormProps) {
  const [name, setName] = useState(initialValue)

  // Update input when switching edit mode
  useEffect(() => {
    setName(initialValue)
  }, [initialValue])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    onSubmit(name)
    setName("") // clear after submit
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter quant name"
      />
      <button type="submit">
        {isEditing ? "Update" : "Add"}
      </button>
    </form>
  )
}