export interface IPokemon {
  id: number
  name: string
  types: { type: { name: string } }[]
  stats: { stat: { name: string }; base_stat: number }[]
}
