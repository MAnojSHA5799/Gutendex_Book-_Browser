import React from 'react';
import { useNavigate } from 'react-router-dom';

const genres = [
  { id: 'fiction', name: 'FICTION', icon: '📚' },
  { id: 'philosophy', name: 'PHILOSOPHY', icon: '🤔' },
  { id: 'drama', name: 'DRAMA', icon: '🎭' },
  { id: 'history', name: 'HISTORY', icon: '📜' },
  { id: 'humour', name: 'HUMOUR', icon: '😄' },
  { id: 'adventure', name: 'ADVENTURE', icon: '🗺️' },
  { id: 'politics', name: 'POLITICS', icon: '👔' }
];

const GenreSelection = () => {
  const navigate = useNavigate();

  const handleClick = (genre) => {
    navigate(`/books/${genre}`);
  };

  return (
    <div className="page-container">
      <div className="center-content">
        <div className="header-section">
          <h1 className="main-title">Gutenberg Project</h1>
          <p className="subtitle">
            A social cataloging website that allows you to freely search its database of books, annotations, and reviews.
          </p>
        </div>

        <div className="genre-grid">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className="genre-card"
              onClick={() => handleClick(genre.id)}
            >
              <span className="genre-icon">{genre.icon}</span>
              <span className="genre-name">{genre.name}</span>
              <span className="arrow-icon">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenreSelection;
