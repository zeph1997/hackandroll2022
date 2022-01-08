import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Import MaterialUi
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";

const font = "'Montserrat', sans-serif";

// Modify theme colour as fit
let theme = createTheme({
  typography: {
    fontFamily: font,
    h2: {
      color: "#000000",
    },
    subtitle1: {
      color: "#000000",
    },
  },
  palette: {
    primary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
