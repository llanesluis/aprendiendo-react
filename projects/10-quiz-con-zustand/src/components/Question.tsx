import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Question as QuestionType } from '../types.d'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from '../store/questions'

interface QuestionProps {
  info: QuestionType
}

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { correctAnswer, userSelectedAnswer } = info

  //Si el usuario no ha seleccionado nada
  if (userSelectedAnswer == null) return 'transparent'

  //Si el usuario selecciono una resp pero no es correcta
  if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

  //Si el usuario selecciono la respuesta correcta
  if (index === correctAnswer) return 'green'

  //Si el usuario selecciono la respuesta incorrecta
  if (index === userSelectedAnswer) return '#cb3234'

  //Si no es ninguna de las anteriores
  return 'transparent'
}

export default function Question({ info }: QuestionProps) {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const handleClick = (answerIndex: number) => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: '#444', p: 2 }}>
      <Typography variant='h5'>{info.question}</Typography>

      <SyntaxHighlighter language='javascript' style={atomOneDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#222', textAlign: 'center' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem
            key={index}
            disablePadding
            divider
            sx={{ bgcolor: getBackgroundColor(info, index) }}
          >
            <ListItemButton
              onClick={() => handleClick(index)}
              disabled={info.userSelectedAnswer != null}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
