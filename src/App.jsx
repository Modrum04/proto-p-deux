import { useState, useEffect } from "react";
import "./App.css";
import "./App.scss";
import { genres } from "../genre";
import Details from "./pages/Details";
import Discover from "./pages/Discover";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h2>Welcome on movie searcher system</h2>
      <p>
        You can directly find a movie that you know the name. Eithern you can explore the entire The
        International Movie Data Base throw our <Link to="discover">Discover system</Link>
      </p>
      <Link to="search">Search a movie</Link>
    </>
  );
}

export default App;
