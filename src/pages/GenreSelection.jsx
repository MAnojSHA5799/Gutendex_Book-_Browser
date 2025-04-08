import React from 'react';
import { useNavigate } from 'react-router-dom';

const genres = ['Fiction', 'Science', 'Fantasy', 'History', 'Biography', 'Children', 'Mystery', 'Romance'];

const GenreSelection = () => {
  const navigate = useNavigate();

  const handleClick = (genre) => {
    navigate(`/books/${genre}`);
  };

  return (
    <div className="genre-selection-wrapper">
      <div className="genre-selection-container">
        <div className="content-wrapper">
          <h1 className="main-title">Gutendex Book Browser</h1>
          <div className="buttons-grid">
            {genres.map((genre, index) => (
              <div 
                key={genre} 
                className="button-wrapper"
                style={{ 
                  animation: 'fadeIn 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <button
                  className="genre-button"
                  onClick={() => handleClick(genre)}
                >
                  {genre}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreSelection;
