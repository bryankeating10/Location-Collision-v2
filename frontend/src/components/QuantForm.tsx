/*
Controlled input component
Will handle input field, submit, and create/edit mode
*/

type Props = {
    onSubmit: (name: string) => void
    initialName?: string
    isEditing?: boolean
}