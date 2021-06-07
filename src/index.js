import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Cookies from "js-cookie";
import View from "./components/View";

const RouteSytem = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={(props) => <Login />} />
        <Route
          path="/view/:id"
          exact
          component={(props) => <View {...props} />}
        />
        <Route
          path="/register"
          exact
          component={(props) => <Register {...props} />}
        />
        <Route
          path="/login"
          exact
          component={(props) => <Login {...props} />}
        />
        <Route
          path="/:list?"
          exact
          component={(props) =>
            Cookies.get("jwt") ? <App {...props} /> : <Redirect to="/login" />
          }
        />
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
