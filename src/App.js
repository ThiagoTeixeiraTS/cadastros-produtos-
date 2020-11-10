import React from "react";
import Navbar from "./components/navbar";
import { HashRouter } from "react-router-dom";
import Rotas from "./rotas";

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Navbar />
        <br />
        <Rotas />
      </div>
    </HashRouter>
  );
}

export default App;
