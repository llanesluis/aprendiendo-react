import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './consts'
import { ArrowIcon } from './components/Icons'
import LanguageSelector from './components/LanguageSelector'
import { SectionType } from './types.d'
import TextArea from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import Tools from './components/Tools'

function App() {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLang,
    setToLang,
    setFromText,
    setResult,
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (fromText === '') return

    translate({ fromLanguage, toLanguage, text: fromText })
      .then((result) => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => {
        setResult('Error')
      })

    console.log(fromText, 'useEffect')
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <Stack gap={4}>
        <h1>Google translate clone</h1>
        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLang}
              />
              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
              {fromText !== '' && (
                <Tools input={fromText} language={fromLanguage} />
              )}
            </Stack>
          </Col>
          <Col xs='auto'>
            <Button
              variant='link'
              disabled={
                fromLanguage === AUTO_LANGUAGE || fromLanguage === toLanguage
              }
              onClick={interchangeLanguages}
            >
              <ArrowIcon />
            </Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLang}
              />
              <TextArea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              {result !== '' && <Tools input={result} language={toLanguage} />}
            </Stack>
          </Col>
        </Row>
      </Stack>
    </Container>
  )
}

export default App
