import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Details.scss";

function Details() {
  let { filmid } = useParams();
  const [fetchResults, setFetchResults] = useState({});
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
      `https://api.themoviedb.org/3/movie/${filmid}?append_to_response=credits&language=fr`,
      options,
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        return setFetchResults(data);
      });
  }, []);

  return (
    <>
      <h1>{fetchResults.original_title}</h1>
      <h2>Details</h2>
      <p>
        Release date : <em>{fetchResults.release_date?.split("-").reverse().join("-")}</em>
      </p>
      <h3>Crew details</h3>
      <div className="casting">
        {fetchResults.credits?.crew.map(
          (crew, i) =>
            i < 4 && (
              <div className="actor-container">
                <div className="actor-description">
                  <p>
                    Job : <span>{crew.job}</span>
                  </p>
                  <p>
                    Nom : <span>{crew.name}</span>{" "}
                  </p>
                </div>

                {crew.profile_path && (
                  <>
                    <br />{" "}
                    <img
                      className="actor-img"
                      src={`https://image.tmdb.org/t/p/w500/${crew.profile_path}`}
                    />
                  </>
                )}
              </div>
            ),
        )}
      </div>
      <h3>Casting details</h3>
      <div className="casting">
        {fetchResults.credits?.cast.map(
          (acteur, i) =>
            i < 4 && (
              <div className="actor-container">
                <div className="actor-description">
                  <p>
                    Role : <span>{acteur.character}</span>
                  </p>
                  <p>
                    Nom : <span>{acteur.name}</span>{" "}
                  </p>
                </div>

                {acteur.profile_path && (
                  <>
                    <br />{" "}
                    <img
                      className="actor-img"
                      src={`https://image.tmdb.org/t/p/w500/${acteur.profile_path}`}
                    />
                  </>
                )}
              </div>
            ),
        )}
      </div>
    </>
  );
}

export default Details;
