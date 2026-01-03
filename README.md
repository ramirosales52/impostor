# Impostor - Juego de Roles

Un juego social para móviles donde los jugadores deben descubrir al impostor entre ellos. Se juega pasándose un solo teléfono entre los participantes.

## Cómo Jugar

1. **Configuración**: Define el número de jugadores e impostores
2. **Revelación**: Cada jugador ve su rol (palabra secreta o impostor con pista) mediante "tap to reveal"
3. **Juego**: Por turnos, cada jugador dice una palabra relacionada con la palabra secreta
4. **El impostor**: Debe camuflarse e inferir la palabra sin quedar regalado
5. **Discusión**: Al final, todos votan para descubrir al impostor

## Características

- Tap to reveal con animación flip 3D
- Gestión completa de palabras (agregar, editar, eliminar)
- Persistencia local de palabras personalizadas
- 20 palabras predefinidas en español
- UI colorida tipo juego con Tamagui
- Animaciones fluidas con React Native Reanimated
- Haptic feedback en interacciones
- Soporte para modo claro/oscuro

## Tecnologías

- **Expo** - Framework React Native
- **Tamagui** - Sistema de diseño y componentes UI
- **Zustand** - Manejo de estado global
- **AsyncStorage** - Persistencia local
- **React Native Reanimated** - Animaciones nativas
- **Expo Router** - Navegación basada en archivos
- **TypeScript** - Tipado estático

## Estructura del Proyecto

```
impostor/
├── app/                    # Pantallas (Expo Router)
│   ├── index.tsx          # Home
│   ├── config.tsx         # Configuración y gestión de palabras
│   └── game/              # Flujo del juego
│       ├── reveal-role.tsx
│       └── playing.tsx
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes UI base
│   └── game/             # Componentes específicos del juego
├── store/                # Estado global (Zustand)
├── utils/                # Utilidades
│   ├── constants.ts      # Palabras iniciales y constantes
│   ├── gameLogic.ts      # Lógica de asignación de roles
│   └── storage.ts        # AsyncStorage wrapper
└── tamagui.config.ts     # Configuración de Tamagui
```

## Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npx expo start
   ```

3. Escanear el QR con la app Expo Go o correr en un emulador:
   - Presiona `a` para Android
   - Presiona `i` para iOS
   - Presiona `w` para web

## Configuración

### Jugadores e Impostores

- Jugadores: 3-10
- Impostores: 1-3 (debe ser menor al número de jugadores)

### Palabras

El juego viene con 20 palabras predefinidas. Puedes agregar, editar o eliminar palabras desde la pantalla de configuración. Las palabras se guardan localmente en el dispositivo.

Formato de palabra:
- **Palabra**: La palabra secreta que verán los jugadores normales
- **Pista**: Una palabra relacionada que verá el impostor

## Scripts Disponibles

- `npm start` - Iniciar Expo
- `npm run android` - Correr en Android
- `npm run ios` - Correr en iOS
- `npm run web` - Correr en web

## Flujo del Juego

```
Home → Config (opcional) → Jugar → Revelar Roles (1 por 1) → Jugando → Fin
```

1. **Home**: Botón para jugar y configurar
2. **Config**: Ajustar participantes/impostores y gestionar palabras
3. **Revelar Roles**: Cada jugador toca para ver su rol, luego pasa al siguiente
4. **Jugando**: Pantalla informativa durante el juego
5. **Terminar**: Resetea el juego y vuelve al home
