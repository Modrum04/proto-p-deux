import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div>
      Details casting
      {fetchResults.credits?.cast.map((acteur) => (
        <div style={{ border: "solid" }}>
          <h3>Role : </h3>
          {acteur.character}
          <h3>Nom : </h3>
          {acteur.name}
          {acteur.profile_path && (
            <>
              <br /> <img src={`https://image.tmdb.org/t/p/w500/${acteur.profile_path}`} />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Details;
