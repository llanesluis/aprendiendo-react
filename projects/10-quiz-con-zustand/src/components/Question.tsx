import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Question } from '../types.d'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface QuestionProps {
  info: Question
}

//TODO: todo esto xd
export default function Question({ info }: QuestionProps) {
  return (
    <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: '#444', p: 2 }}>
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter language='javascript' style={atomOneDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#222', textAlign: 'center' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton>
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
