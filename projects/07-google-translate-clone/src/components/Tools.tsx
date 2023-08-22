import { Button } from 'react-bootstrap'
import { CopyToClipboardIcon, SpeakerIcon } from './Icons'
import { FromLanguage, Language, SectionType } from '../types'
import { AUTO_LANGUAGE } from '../consts'

//TODO: Utilizar la propiedad "type" para renderizar unas herramientas u otras.
type Props = {
  type?: SectionType
  input: string
  language: Language | FromLanguage
}

export const Tools: React.FC<Props> = ({ type, input, language }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(input).catch(() => {})
  }

  const handleSpeak = () => {
    if (language === AUTO_LANGUAGE) return
    const utterance = new SpeechSynthesisUtterance(input)
    utterance.lang = language
    speechSynthesis.speak(utterance)
  }
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        padding: '0px',
        margin: '0px',
      }}
    >
      <Button
        variant='link'
        disabled={input === ''}
        onClick={handleCopyToClipboard}
      >
        <CopyToClipboardIcon />
      </Button>

      <Button
        variant='link'
        disabled={input === '' || language === AUTO_LANGUAGE}
        onClick={handleSpeak}
      >
        <SpeakerIcon />
      </Button>
    </div>
  )
}

export default Tools
