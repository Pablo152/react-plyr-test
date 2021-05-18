import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Room from "./pages/Room";
import { AnimatedRoute } from "react-router-transition";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AnimatedRoute
        path="/room/:id/:link"
        component={Room}
        atEnter={{ offset: 100 }}
        atLeave={{ offset: 100 }}
        atActive={{ offset: 0 }}
        mapStyles={(styles) => ({
          transform: `translateX(${styles.offset}%)`,
        })}
      />
      <Route exact path="/">
        <Home />
      </Route>
    </Router>
  );
}

export default App;
