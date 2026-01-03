import { Word } from '../store/types'

export const DEFAULT_WORDS: Word[] = [
  { word: 'Playa', hints: ['verano', 'arena', 'mar'] },
  { word: 'Hospital', hints: ['doctor', 'enfermero', 'salud'] },
  { word: 'Cine', hints: ['película', 'palomitas', 'pantalla'] },
  { word: 'Aeropuerto', hints: ['avión', 'vuelo', 'viaje'] },
  { word: 'Gimnasio', hints: ['ejercicio', 'pesas', 'músculos'] },
  { word: 'Biblioteca', hints: ['libros', 'silencio', 'lectura'] },
  { word: 'Restaurante', hints: ['comida', 'mesero', 'menú'] },
  { word: 'Escuela', hints: ['estudiante', 'profesor', 'aula'] },
  { word: 'Supermercado', hints: ['compras', 'carrito', 'productos'] },
  { word: 'Parque', hints: ['naturaleza', 'árboles', 'juegos'] },
  { word: 'Casino', hints: ['apuesta', 'ruleta', 'cartas'] },
  { word: 'Zoológico', hints: ['animales', 'jaulas', 'safari'] },
  { word: 'Museo', hints: ['arte', 'pinturas', 'cultura'] },
  { word: 'Estadio', hints: ['deporte', 'fútbol', 'público'] },
  { word: 'Iglesia', hints: ['religión', 'misa', 'rezar'] },
  { word: 'Peluquería', hints: ['cabello', 'corte', 'tijeras'] },
  { word: 'Banco', hints: ['dinero', 'cajero', 'préstamo'] },
  { word: 'Hotel', hints: ['hospedaje', 'habitación', 'turista'] },
  { word: 'Oficina', hints: ['trabajo', 'escritorio', 'computadora'] },
  { word: 'Cocina', hints: ['cocinar', 'receta', 'estufa'] },
]

export const MIN_PLAYERS = 3
export const MIN_IMPOSTORS = 1

export const STORAGE_KEYS = {
  WORDS: '@impostor_words',
  CONFIG: '@impostor_config',
}
