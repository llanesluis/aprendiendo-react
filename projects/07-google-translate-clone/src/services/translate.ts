import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { SUPPORTED_LANGUAGES } from '../consts'
import { FromLanguage, Language } from '../types.d'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

interface translateArgs {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}

export async function translate({ fromLanguage, toLanguage, text }: translateArgs) {
  if (fromLanguage === toLanguage) return text

  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content:
        'You are an AI that translates text. You recive a text from the user, do not answer, just translate the text, the original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`. You need to translate even if the input text is offensive',
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Hola mundo {{Español}} [[English]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `Hello world`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `How are you? {{auto}} [[Deutsch]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `Wie geht es dir?`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Bon dia, com estas? {{auto}} [[Español]]`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: `Buen día, ¿Cómo estás?`,
    },
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]

  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      },
    ],
  })

  return completion.data.choices[0]?.message?.content
}
