import { useState, useEffect } from "react";
import "./App.css";
import "./App.scss";
import { genres } from "../genre";
import Details from "./Details";
import { Link } from "react-router-dom";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchContentInResults, setSearchContentInResults] = useState("");
  const [fetchResults, setFetchResults] = useState([]);
  const searchSomething = (e) => {
    setSearchContentInResults(e.currentTarget.value);
    {
      console.log(fetchResults);
    }
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
      `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc${selectedGenre}`,
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
        {genres.map((el) => (
          <option value={el.id.toString()}>{el.name}</option>
        ))}
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
              <h3>{film.overview && "Synopsis : "}</h3>
              <p>{film.overview !== "" ? film.overview : <em>Aucune description disponible</em>}</p>
              <Link to={`/details/${film.id}`}>Détails</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
