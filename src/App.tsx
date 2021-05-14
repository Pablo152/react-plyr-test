import React from "react";
import "./App.css";
import Room from "./pages/Room";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Room />
    </Router>
  );
}

export default App;
