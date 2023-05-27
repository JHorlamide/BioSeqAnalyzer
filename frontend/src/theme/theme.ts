import { extendTheme, ThemeConfig } from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true
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

      brand: {
        50: "#5c5c5c",
        100: "#333333",
        200: "#3d3d3d",
      },

      // brand_blue: {
      //   50: "#4169E1",
      //   100: "#4682B4",
      //   200: "#1E90FF",
      //   300: "#08355a"
      // },

      // brand_blue: {
      //   50: "#00308F",
      //   100: "#1F4DA0",
      //   200: "#4876FF",
      // },

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

// brand_blue.300 = #08355a
// brand_blue.400 = #006dc6
// brand_blue.500 = #004f90 

