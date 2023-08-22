import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import { ChangeEvent } from 'react'

interface Props {
  type: SectionType
  value: string
  loading?: boolean
  onChange: (value: string) => void
}

const TextArea: React.FC<Props> = ({ type, loading, value, onChange }) => {
  const placeholder =
    type === SectionType.From
      ? 'Introduzca el texto...'
      : loading === true
      ? 'Traduciendo...'
      : 'Traducción'

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (type === SectionType.From) {
      onChange(event.target.value)
      return
    }

    return
  }

  return (
    <Form.Control
      onChange={handleChange}
      disabled={type === SectionType.To}
      autoFocus={type === SectionType.From}
      as='textarea'
      placeholder={placeholder}
      style={{ height: '150px', resize: 'none' }}
      value={value}
    />
  )
}

export default TextArea
