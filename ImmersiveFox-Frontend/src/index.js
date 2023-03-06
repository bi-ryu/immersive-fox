import React from "react";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider} from "@mui/material";
import theme from "./theme";
//global style
import "./scss/style.scss";
import {getEnv} from "./utils";

if (getEnv() !== 'local') {
  Sentry.init({
    dsn: "https://075d9f10ed7141f09535009d7b231433@o1220639.ingest.sentry.io/6366841",
    integrations: [new BrowserTracing()],
    environment: getEnv(),
    tracesSampleRate: 0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
