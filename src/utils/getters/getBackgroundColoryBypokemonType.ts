import { theme } from '../../styles/theme'

interface IPokemonType {
  type: {
    name: string
  }
}

export const getBackgroundColoryBypokemonType = (types: IPokemonType[]) => {
  const typeColors: { [key: string]: string } = {
    electric: theme.colors.electric,
    grass: theme.colors.grass,
    fire: theme.colors.fire,
    water: theme.colors.water,
    fairy: theme.colors.fairy,
    poison: theme.colors.poison,
    flying: theme.colors.flying,
    fighting: theme.colors.fighting,
    rock: theme.colors.rock,
    psychic: theme.colors.psychic,
    bug: theme.colors.bug,
  }

  const defaultColor = theme.colors.defaultBackground

  const typeNames = types?.map((type) => type?.type.name) || []

  for (const typeName of typeNames) {
    if (typeColors[typeName]) {
      return typeColors[typeName]
    }
  }

  return defaultColor
}
