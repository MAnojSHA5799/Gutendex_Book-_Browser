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

  const handleImageError = (e) => {
    // Create a data URL for a placeholder image with the book's first letter
    const canvas = document.createElement('canvas');
    canvas.width = 114;
    canvas.height = 162;
    const ctx = canvas.getContext('2d');
    
    // Background color based on the book's title (for variety)
    const colors = ['#5E56E7', '#F0F0F6', '#A0A0A0', '#333333'];
    const colorIndex = book.title.length % colors.length;
    ctx.fillStyle = colors[colorIndex];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Montserrat';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(book.title.charAt(0).toUpperCase(), canvas.width / 2, canvas.height / 2);
    
    // Set the data URL as the image source
    e.target.src = canvas.toDataURL();
  };

  return (
    <div className="book-card-wrapper" onClick={handleClick}>
      <div className="book-card">
        <img
          src={book.formats['image/jpeg']}
          alt={book.title}
          className="book-cover"
          onError={handleImageError}
        />
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
