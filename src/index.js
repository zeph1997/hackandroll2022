import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Import Redux
import store from "./store";
import { Provider } from "react-redux";

// Import MaterialUi
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const font = "'Montserrat', sans-serif";

// Modify theme colour as fit
let theme = createTheme({
  typography: {
    fontFamily: font,
    h3: {
      color: "#ffffff",
    },
    h4: {
      color: "#000000",
      fontWeight: "bolder",
    },
    subtitle1: {
      color: "#ffffff",
      fontWeight: "bolder",
    },
    subtitle2: {
      color: "#000000",
      fontWeight: "bolder",
    },
  },
  palette: {
    primary: {
      main: "#4E5D79",
    },
    background: {
      default: "#E3F4FE",
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
