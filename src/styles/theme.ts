import { DefaultTheme } from '@react-navigation/native'

export const theme = {
  colors: {
    primary: '#DC143C',
    white: '#ffffff',
    black: '#181818',
    blue: '#4682B4',

    electric: '#fed86d',
    grass: '#47d1af',
    fire: '#fb6c6b',
    water: '#6bc1ff',
    fairy: '#ff7bbf',
    poison: '#9b30ff',
    flying: '#add8e6',
    fighting: '#cd7f32',
    rock: '#6e7f82',
    psychic: '#ff7f50',
    defaultBackground: '#b4bac4',
    bug: '#8bc34a',
  },
}

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
}
