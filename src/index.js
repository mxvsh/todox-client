import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const RouteSytem = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:list?" exact component={(props) => <App {...props} />} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouteSytem />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
