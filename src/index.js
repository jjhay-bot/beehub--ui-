import React from "react";
import ReactDOM from "react-dom/client";
import "./util/styles/index.css";
import reportWebVitals from "./util/reportWebVitals";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./util/styles/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { Notification } from "./components/atoms/Notification";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      {/* <Provider store={store}> */}
      <ThemeProvider theme={theme}>
        <App />
        <Notification />
      </ThemeProvider>
      {/* </Provider> */}
    </ApolloProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
