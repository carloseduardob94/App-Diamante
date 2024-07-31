import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    blue: {
      700: '#021F59',
      500: '#1351B4',
      300: '#B4BCCE'
    },
    gray: {
      700: '#565656',
      500: '#999999',
      300: '#EDEDEE',
    }
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
    medium: 'Roboto_500Medium',
    bodyflex: 'RobotoFlex_400Regular'
  },
  fontSizes: {
    "2xs": 8,
    "xs": 10,
    "sm": 12,
    "md": 14,
    "lg": 16,
    "xl": 20,
    "2xl": 24
  },
  sizes: {
    14: 56,
    33: 148
  }
})