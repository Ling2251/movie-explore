import React from 'react';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const MovieCard = ({ movie }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150x225/d1d5db/6b7280?text=No+Image';
  };

  return (
    <div className="movie-card">
      <img 
        src={movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/150x225/d1d5db/6b7280?text=No+Image'}
        alt={movie.title}
        className="movie-poster"
        onError={handleImageError}
      />
      <div className="movie-info">
        <div className="movie-title">{movie.title}</div>
        <div className="movie-details">
          {movie.release_date && (
            <div className="release-date">Release Date: {movie.release_date}</div>
          )}
          {movie.vote_average > 0 && (
            <div className="movie-rating">Rating: {movie.vote_average.toFixed(3)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;