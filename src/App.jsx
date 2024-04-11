import { useState, useEffect } from "react";
import "./App.css";
import "./App.scss";

function App() {
  // const stars = Array(rate).fill("⭐");
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
      "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=fr&page=1&sort_by=popularity.desc",
      options,
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(fetchResults);
        return setFetchResults(data.results);
      });
  }, []);

  return (
    <>
      <input
        type="search"
        placeholder="search a movie"
        onChange={searchSomething}
        className="search-bar"
      ></input>
      <p>
        {filteredArray(fetchResults).length === 0
          ? "Il semblerait qu'aucun film ne corresponde à votre recherche"
          : `Nombre de résultats : ${filteredArray(fetchResults).length}`}
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
            </div>{" "}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
