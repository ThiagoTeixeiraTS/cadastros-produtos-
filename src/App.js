import React, { Component } from "react";
import Navbar from "./components/navbar";

import Rotas from "./rotas";

function App() {
  return (
    <>
      <div className="container">
        <Navbar />
        <br />
        <Rotas />
      </div>
    </>
  );
}

export default App;
