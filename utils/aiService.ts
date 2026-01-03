import { GoogleGenerativeAI } from '@google/generative-ai'
import type { Word } from '../store/types'

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || ''
const genAI = new GoogleGenerativeAI(API_KEY)

const SYSTEM_PROMPT = `Eres un asistente que genera palabras para un juego estilo "Impostor" donde hay una palabra y un impostor que no sabe la misma.
El objetivo es adivinar quien es el impostor diciendo una palabra relacionada a la palabra por turnos
Tu tarea es interpretar pedidos en lenguaje natural y generar listas de palabras simples, claras y conocidas en español ARGENTINO.

REGLAS IMPORTANTES:
1. Genera EXACTAMENTE el número de palabras solicitado (máximo 25)
2. Si son personas, usa el nombre completo reconocible
3. Si son lugares, usa nombres específicos cuando sea posible
4. Cada palabra debe tener exactamente 3 pistas distintas
5. Las pistas deben ser estrictamente solo UNA palabra pero no obvia
6. FORMATO ESTRICTO: Devuelve SOLO un array JSON válido, sin texto adicional
7. No repitas palabras.
8. Capitalizá la primera letra de cada palabra.

FORMATO DE RESPUESTA (JSON puro):
[
  {
    "word": "Lionel Messi",
    "hints": ["Fútbol", "Mundial", "10"]
  },
  {
    "word": "Paris",
    "hints": ["Torre", "Amor", "Ciudad"]
  }
]

Asegúrate de que el JSON sea válido y parseable. NO agregues explicaciones ni texto fuera del JSON.`

export async function generateWords(userPrompt: string): Promise<Word[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

    const fullPrompt = `${SYSTEM_PROMPT}

SOLICITUD DEL USUARIO: ${userPrompt}

Genera las palabras solicitadas siguiendo el formato JSON exacto.`

    const result = await model.generateContent(fullPrompt)
    const response = result.response
    const text = response.text()

    // Limpiar el texto para extraer solo el JSON
    let jsonText = text.trim()

    // Remover markdown code blocks si existen
    jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')

    // Buscar el array JSON en el texto
    const jsonMatch = jsonText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('No se pudo extraer JSON válido de la respuesta')
    }

    const parsedWords = JSON.parse(jsonMatch[0]) as Array<{
      word: string
      hints: string[]
    }>

    // Validar y transformar al formato correcto
    const validWords: Word[] = parsedWords
      .filter(w => w.word && Array.isArray(w.hints) && w.hints.length >= 3)
      .slice(0, 25) // Máximo 25 palabras
      .map(w => ({
        word: w.word,
        hints: [w.hints[0], w.hints[1], w.hints[2]] as [string, string, string],
      }))

    if (validWords.length === 0) {
      throw new Error('No se generaron palabras válidas')
    }

    return validWords
  } catch (error) {
    console.error('Error generando palabras:', error)
    throw new Error(
      error instanceof Error
        ? `Error al generar palabras: ${error.message}`
        : 'Error desconocido al generar palabras'
    )
  }
}
