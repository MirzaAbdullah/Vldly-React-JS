import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Movies />
      </main>
    </React.Fragment>
  );
}

export default App;
