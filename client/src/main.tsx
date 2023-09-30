// Core
import React from "react";
import ReactDOM from "react-dom/client";

// Libraries
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Application Modules
import { store, persistor } from "./store/store";
import { toastStyle } from "./config/AppConfig";
import { Toaster } from "react-hot-toast";
import { theme } from "./theme/theme";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <ColorModeScript />
          <Toaster toastOptions={{
            duration: 4000,
            position: "top-right",
            ...toastStyle
          }}
          />
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
