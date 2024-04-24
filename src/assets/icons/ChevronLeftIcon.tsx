import { theme } from '../../src/styles/theme'
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg'

export const ChevronLeftIcon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width="24" height="24" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke={theme.colors.primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 19-7-7 7-7"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={theme.colors.neutral} d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
