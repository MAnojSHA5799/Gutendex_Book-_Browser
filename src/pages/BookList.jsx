import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch('');
  };

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
              <Link to="/" className="back-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {genre}
              </Link>
              {/* <h1 className="page-title">{genre} Books</h1> */}
            </div>
          </div>

          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by title or author..."
                value={search}
                onChange={handleSearchChange}
              />
              {search && (
                <button className="search-clear-button" onClick={handleClearSearch}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
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
