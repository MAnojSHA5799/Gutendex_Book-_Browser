import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenreSelection from './pages/GenreSelection';
import BookList from './pages/BookList';
import './styles/main.css';
import './styles/gutenberg.css';

function App() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="app-root">
        <Router>
          <Routes>
            <Route path="/" element={<GenreSelection />} />
            <Route path="/books/:genre" element={<BookList />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
