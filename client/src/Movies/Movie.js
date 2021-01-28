import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie({ addToSavedList, setMovieList, movieList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();
  const { id } = useParams();
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = ()=> {
    push(`/update-movie${movie.id}`)
  }

  const deleteClick = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        getMovieList();
        push("/")
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className = "update">
        <button onClick = {updateMovie}>Update</button>
        <button onClick = {deleteClick}>Delete</button>
      </div>
    </div>
  );
}

export default Movie;
