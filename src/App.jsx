import { useState, useEffect } from "react";
import "./App.css";
import "./App.scss";
import { genres } from "../genre";

function App() {
  // const stars = Array(rate).fill("⭐");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchContentInResults, setSearchContentInResults] = useState("");
  const [fetchResults, setFetchResults] = useState([]);
  const searchSomething = (e) => {
    setSearchContentInResults(e.currentTarget.value);
  };

  function filteredArray(array) {
    return array.filter((film) =>
      film.original_title.toLowerCase().includes(searchContentInResults.toLowerCase()),
    );
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmYyMzhhNmNiZjJiZmRjYjhmYmE4ZjY2NDBmNzhmOCIsInN1YiI6IjY2MTU1OGFmNTkwMDg2MDE4NTdmNzA2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n-jnINfcJwkaDek3mDv2qznoqOsktnAqaKErxLr8sPQ",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr&page=1&sort_by=popularity.desc${selectedGenre}`,
      options,
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(fetchResults);
        return setFetchResults(data.results);
      });
  }, [selectedGenre]);

  return (
    <>
      <select
        name="genre"
        className="search-select"
        onChange={(e) => setSelectedGenre("&with_genres=" + e.currentTarget.value.toString())}
      >
        <option value="">--Tous les genres--</option>
        <option value="28">Action</option>
        <option value="12">Aventure</option>
        <option value="16">Animation</option>
        <option value="35">Comédie</option>
        <option value="80">Crime</option>
        <option value="99">Documentaire</option>
        <option value="18">Drame</option>
        <option value="10751">Familial</option>
        <option value="14">Fantastique</option>
        <option value="36">Histoire</option>
        <option value="27">Horreur</option>
        <option value="10402">Musique</option>
        <option value="9648">Mystère</option>
        <option value="10749">Romance</option>
        <option value="878">Science-Fiction</option>
        <option value="10770">Téléfilm</option>
        <option value="53">Thriller</option>
        <option value="10752">Guerre</option>
        <option value="37">Western</option>
      </select>

      <input
        type="search"
        placeholder="search a movie in results"
        onChange={searchSomething}
        className="search-bar"
      ></input>

      <p>
        {filteredArray(fetchResults).length === 0
          ? "Il semblerait qu'aucun film ne corresponde à votre recherche"
          : `Nombre de résultats affichés : ${filteredArray(fetchResults).length}`}
      </p>
      <div className="cards">
        {filteredArray(fetchResults).map((film) => (
          <div className="card-container">
            <div className="cover-container">
              <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} />
            </div>
            <div className="description-container">
              <h2>{film.original_title}</h2>
              <em>{film.release_date.split("-").reverse().join("-")}</em>
              <p>{Array(Math.floor(film.vote_average)).fill("⭐")}</p>
              <div className="separator"></div>
              <h3>Synopsis : </h3>
              <p>{film.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
