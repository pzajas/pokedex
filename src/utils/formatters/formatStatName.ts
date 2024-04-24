export const formatStatName = (statName: string) => {
  statName = statName.replace(/-/g, '.')

  if (statName.includes(' ')) {
    statName = statName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  if (statName.startsWith('special')) {
    statName = 'Sp' + statName.slice(7)
  }

  return statName
}
