import React from 'react';

const getPreferredFormatUrl = (formats) => {
  const preferred = ['text/html', 'application/pdf', 'text/plain'];
  for (let type of preferred) {
    const match = Object.entries(formats).find(
      ([key]) =>
        key.startsWith(type) &&
        !key.includes('.zip') &&
        !formats[key].includes('.zip')
    );
    if (match) return match[1];
  }
  return null;
};

const BookCard = ({ book }) => {
  const handleClick = () => {
    const url = getPreferredFormatUrl(book.formats);
    if (url) {
      window.open(url, '_blank');
    } else {
      alert('No viewable version available');
    }
  };

  return (
    <div className="book-card-wrapper" onClick={handleClick}>
      <div className="book-card">
        <div className="book-image-container">
          <img
            src={book.formats['image/jpeg']}
            alt={book.title}
            className="book-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
            }}
          />
        </div>
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">
            {book.authors.map((a) => a.name).join(', ') || 'Unknown Author'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
