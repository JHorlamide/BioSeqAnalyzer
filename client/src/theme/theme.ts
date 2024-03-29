import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
}

export const theme = extendTheme(
  { config },
  {
    colors: {
      blue: "#2196F3",

      gray: {
        50: "#f9f9f9",
        100: "#ededed",
        200: "d3d3d3",
        300: "#b3b3b3",
        400: "#a0a0a0",
        500: "#898989",
        600: "6c6c6c",
        700: "#202020",
        800: "#121212",
        900: "#111"
      },

      brand_blue: {
        50: "#2B547E",
        100: "#5C89B3",
        200: "#7AA7D6",
        300: "#08355a",
        400: "#006dc6",
        500: "#004f90"
      },
    },
  }
)

