import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { theme } from "./theme/theme";
import App from "./App";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Toaster toastOptions={{ duration: 4000 }} />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
