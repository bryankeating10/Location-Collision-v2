/*
Controlled input component
Will handle input field, submit, and create/edit mode
*/

type QuantFormProps = {
  onSubmit: (name: string) => void
  initialValue?: string
  isEditing?: boolean
}