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
  
  // Animales
  { word: 'León', hints: ['melena', 'sabana', 'rugido'] },
  { word: 'Elefante', hints: ['trompa', 'grande', 'memoria'] },
  { word: 'Delfín', hints: ['inteligente', 'saltos', 'océano'] },
  { word: 'Águila', hints: ['plumas', 'pico', 'vuela alto'] },
  { word: 'Serpiente', hints: ['reptil', 'veneno', 'arrastra'] },
  { word: 'Tiburón', hints: ['dientes', 'aletas', 'peligroso'] },
  { word: 'Jirafa', hints: ['cuello largo', 'manchas', 'hojas'] },
  { word: 'Pingüino', hints: ['frío', 'smokir', 'nada'] },
  { word: 'Koala', hints: ['eucalipto', 'Australia', 'perezoso'] },
  { word: 'Mariposa', hints: ['colores', 'alas', 'flor'] },
  
  // Profesiones
  { word: 'Bombero', hints: ['fuego', 'manguera', 'rescate'] },
  { word: 'Chef', hints: ['cocina', 'gorro', 'platillos'] },
  { word: 'Piloto', hints: ['avión', 'cielo', 'cabina'] },
  { word: 'Detective', hints: ['pistas', 'misterio', 'lupa'] },
  { word: 'Astronauta', hints: ['espacio', 'traje', 'luna'] },
  { word: 'Músico', hints: ['instrumento', 'melodía', 'concierto'] },
  { word: 'Pintor', hints: ['pincel', 'colores', 'lienzo'] },
  { word: 'Fotógrafo', hints: ['cámara', 'imagen', 'flash'] },
  { word: 'Arquitecto', hints: ['planos', 'edificios', 'diseño'] },
  { word: 'Periodista', hints: ['noticias', 'micrófono', 'reportar'] },
  
  // Deportes
  { word: 'Fútbol', hints: ['pelota', 'gol', 'arquero'] },
  { word: 'Baloncesto', hints: ['canasta', 'bote', 'altura'] },
  { word: 'Tenis', hints: ['raqueta', 'red', 'saque'] },
  { word: 'Natación', hints: ['piscina', 'crol', 'agua'] },
  { word: 'Boxeo', hints: ['guantes', 'ring', 'knockout'] },
  { word: 'Surf', hints: ['olas', 'tabla', 'equilibrio'] },
  { word: 'Esquí', hints: ['nieve', 'montaña', 'bastones'] },
  { word: 'Golf', hints: ['hoyo', 'palo', 'césped'] },
  { word: 'Karate', hints: ['artes marciales', 'cinturón', 'patada'] },
  { word: 'Ciclismo', hints: ['bicicleta', 'pedales', 'casco'] },
  
  // Comidas
  { word: 'Pizza', hints: ['queso', 'horno', 'redonda'] },
  { word: 'Hamburguesa', hints: ['carne', 'pan', 'ketchup'] },
  { word: 'Sushi', hints: ['arroz', 'pescado', 'japonés'] },
  { word: 'Tacos', hints: ['tortilla', 'mexicano', 'salsa'] },
  { word: 'Pasta', hints: ['italiano', 'fideos', 'salsa'] },
  { word: 'Paella', hints: ['arroz', 'mariscos', 'española'] },
  { word: 'Asado', hints: ['carne', 'parrilla', 'carbón'] },
  { word: 'Empanadas', hints: ['relleno', 'masa', 'horneadas'] },
  { word: 'Hot Dog', hints: ['salchicha', 'pan largo', 'mostaza'] },
  { word: 'Ensalada', hints: ['lechuga', 'saludable', 'verde'] },
  
  // Instrumentos
  { word: 'Guitarra', hints: ['cuerdas', 'rasguear', 'música'] },
  { word: 'Piano', hints: ['teclas', 'blanco y negro', 'melodía'] },
  { word: 'Batería', hints: ['platillos', 'ritmo', 'baquetas'] },
  { word: 'Violín', hints: ['arco', 'clásico', 'cuerdas'] },
  { word: 'Trompeta', hints: ['viento', 'dorado', 'jazz'] },
  { word: 'Flauta', hints: ['soplar', 'agujeros', 'dulce'] },
  { word: 'Saxofón', hints: ['jazz', 'curvo', 'viento'] },
  { word: 'Acordeón', hints: ['fuelle', 'baile', 'botones'] },
  { word: 'Arpa', hints: ['ángel', 'cuerdas', 'elegante'] },
  { word: 'Maracas', hints: ['sacudir', 'semillas', 'ritmo'] },
  
  // Vehículos
  { word: 'Ambulancia', hints: ['emergencia', 'sirena', 'hospital'] },
  { word: 'Camión de bomberos', hints: ['rojo', 'escalera', 'agua'] },
  { word: 'Taxi', hints: ['amarillo', 'transporte', 'tarifa'] },
  { word: 'Tren', hints: ['rieles', 'vagones', 'estación'] },
  { word: 'Barco', hints: ['vela', 'ancla', 'mar'] },
  { word: 'Helicóptero', hints: ['hélices', 'vuela', 'rescate'] },
  { word: 'Submarino', hints: ['bajo agua', 'periscopio', 'profundo'] },
  { word: 'Motocicleta', hints: ['dos ruedas', 'casco', 'rápida'] },
  { word: 'Camioneta', hints: ['carga', 'pickup', 'trabajo'] },
  { word: 'Bicicleta', hints: ['pedales', 'ecológica', 'timbre'] },
  
  // Objetos cotidianos
  { word: 'Reloj', hints: ['hora', 'manecillas', 'pulsera'] },
  { word: 'Teléfono', hints: ['llamar', 'pantalla', 'aplicaciones'] },
  { word: 'Laptop', hints: ['computadora', 'portátil', 'teclado'] },
  { word: 'Espejo', hints: ['reflejo', 'vidrio', 'imagen'] },
  { word: 'Paraguas', hints: ['lluvia', 'abrir', 'protección'] },
  { word: 'Mochila', hints: ['cargar', 'espalda', 'estudiante'] },
  { word: 'Gafas', hints: ['ver', 'lentes', 'montura'] },
  { word: 'Linterna', hints: ['luz', 'oscuridad', 'batería'] },
  { word: 'Llave', hints: ['abrir', 'metal', 'cerradura'] },
  { word: 'Maleta', hints: ['viaje', 'ropa', 'ruedas'] },
  
  // Países
  { word: 'Argentina', hints: ['tango', 'asado', 'Messi'] },
  { word: 'Brasil', hints: ['samba', 'Amazonas', 'fútbol'] },
  { word: 'México', hints: ['tacos', 'mariachi', 'azteca'] },
  { word: 'España', hints: ['paella', 'toros', 'flamenco'] },
  { word: 'Francia', hints: ['Torre Eiffel', 'vino', 'baguette'] },
  { word: 'Italia', hints: ['pizza', 'Coliseo', 'pasta'] },
  { word: 'Japón', hints: ['sushi', 'samurai', 'monte Fuji'] },
  { word: 'Estados Unidos', hints: ['hamburguesa', 'dólar', 'Hollywood'] },
  { word: 'Canadá', hints: ['maple', 'hockey', 'frío'] },
  { word: 'Australia', hints: ['canguro', 'surf', 'koala'] },
]

export const MIN_PLAYERS = 3
export const MIN_IMPOSTORS = 1

export const STORAGE_KEYS = {
  WORDS: '@impostor_words',
  CONFIG: '@impostor_config',
}
