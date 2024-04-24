import Color from 'color'

export const getAdjustedColor = (color: string) => {
  const lightenFactor = 0.2
  const adjustedColor = Color(color).lighten(lightenFactor).hex()
  return adjustedColor
}
