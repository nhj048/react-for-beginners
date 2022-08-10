import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json);
    setLoading(false);
  };

  // async function getMovie() {
  //   const json = await (
  //     await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
  //   ).json();
  //   setMovie(json);
  //   setLoading(false);
  // }

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (<p>Loading...</p>) : (
          <div>
            <img src={movie.data.movie.large_cover_image} alt={movie.data.movie.title}/>
            <h1>{movie.data.movie.title}</h1>
            <div>{movie.data.movie.genres.map((value, index) => (
              <span key={index} style={{marginRight: '8px'}}>{value}</span>
            ))}</div>
          </div>
      )}
    </div>
  );
}

export default Detail;
