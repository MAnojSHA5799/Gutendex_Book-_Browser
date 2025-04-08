import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBooks } from '../utils/api';
import BookCard from '../components/BookCard';

const BookList = () => {
  const { genre } = useParams();
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const loader = useRef(null);

  const loadBooks = async (reset = false) => {
    if (loading && !reset) return;
    setLoading(true);
    try {
      const data = await fetchBooks({
        topic: genre,
        search,
        page: reset ? 1 : nextPage,
      });
      setBooks(reset ? data.results : [...books, ...data.results]);
      setNextPage(data.next ? nextPage + 1 : null);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadBooks(true);
  }, [search, genre]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPage) {
        loadBooks();
      }
    });
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.disconnect();
  }, [nextPage]);

  if (initialLoading) {
    return (
      <div className="book-list-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-list-wrapper">
      <div className="book-list-container">
        <div className="sticky-header">
          <div className="title-section">
            <div className="title-content">
              <h1 className="page-title">{genre} Books</h1>
              <button 
                className="back-button"
                onClick={() => window.history.back()}
              >
                Back to Genres
              </button>
            </div>
          </div>

          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by title or author..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="books-content">
          {books.length === 0 && !loading ? (
            <div className="no-results">
              <h3>No books found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="books-grid">
              {books.map((book, index) => (
                <div 
                  key={book.id}
                  className="book-item"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeIn 0.5s ease-out forwards'
                  }}
                >
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div ref={loader} className="loader-section">
          {loading && <div className="loading-spinner"></div>}
        </div>
      </div>
    </div>
  );
};

export default BookList;
