import Svg, { Path } from 'react-native-svg'
import { theme } from '../../../src/styles/theme'

export const InstagramIcon = (props) => (
  <Svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke={theme.colors.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5z"
    />
    <Path
      stroke={theme.colors.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 11.37a4 4 0 11-7.914 1.174A4 4 0 0116 11.37zM17.995 6.427a.5.5 0 11-.99.146.5.5 0 01.99-.146z"
    />
  </Svg>
)
