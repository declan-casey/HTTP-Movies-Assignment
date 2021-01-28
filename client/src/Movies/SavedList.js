import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useParams, useHistory } from "react-router-dom";
function SavedList({ list }) {
  const {push} = useHistory();
  const addMovie = () => {
    push('/add-movie')
  }
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}
      <div className="home-button">
        <button onClick = {addMovie}>Add Movie</button>
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}

export default SavedList;
