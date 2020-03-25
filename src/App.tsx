import React from "react";
import { Provider } from "react-redux";
import { Provider as GQLProvider } from "urql";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createStore from "./store";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import gqlClient from "./network/client";
import Metrics from "./components/Metrics";

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(39,49,66)",
    },
    secondary: {
      main: "rgb(197,208,222)",
    },
    background: {
      default: "rgb(226,231,238)",
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <GQLProvider value={gqlClient}>
        <Wrapper>
          <Header />
          <Metrics />
          <ToastContainer />
        </Wrapper>
      </GQLProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
