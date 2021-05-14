import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Room from "./pages/Room";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/room/:id/:link">
        <Room />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Router>
  );
}

export default App;
