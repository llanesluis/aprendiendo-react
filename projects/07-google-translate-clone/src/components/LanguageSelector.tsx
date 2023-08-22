import Form from 'react-bootstrap/Form'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../consts'
import { type FromLanguage, type Language, SectionType } from '../types.d'
import { ChangeEvent } from 'react'

type Props =
  | {
      type: SectionType.From
      value: FromLanguage
      onChange: (language: FromLanguage) => void
    }
  | {
      type: SectionType.To
      value: Language
      onChange: (language: Language) => void
    }

export const LanguageSelector: React.FC<Props> = ({
  type,
  value,
  onChange,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select
      aria-label='Default select example'
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}

export default LanguageSelector
