import React from 'react';
import { useNavigate } from 'react-router-dom';

const genres = [
  'Fiction', 'Science', 'Fantasy', 'History',
  'Biography', 'Children', 'Mystery', 'Romance',
];

const GenreButtons = () => {
  const navigate = useNavigate();

  const handleClick = (genre) => {
    navigate(`/books/${genre}`);
  };

  return (
    <div className="container mt-5 fade-in">
      <h1 className="text-center mb-4 display-4">Select a Genre</h1>
      <div className="row justify-content-center g-4">
        {genres.map((genre, index) => (
          <div 
            key={genre} 
            className="col-6 col-sm-4 col-md-3 mb-3 d-grid"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animation: 'fadeIn 0.5s ease-out forwards'
            }}
          >
            <button
              className="btn btn-primary genre-button py-3"
              onClick={() => handleClick(genre)}
            >
              {genre}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreButtons;
