import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg'
import { theme } from '../../src/styles/theme'

export const ChevronLeftIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke={theme.colors.white}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m15 19-7-7 7-7"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={theme.colors.white} d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
