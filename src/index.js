import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyles from "./GlobalStyles";
import theme from "./styles";
import { client } from "./apollo";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
