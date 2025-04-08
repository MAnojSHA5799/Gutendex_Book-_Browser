import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenreSelection from './pages/GenreSelection';
import BookList from './pages/BookList';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="app-container fade-in min-vh-100 d-flex align-items-center justify-content-center">
        <div className="w-100">
          <Routes>
            <Route path="/" element={<GenreSelection />} />
            <Route path="/books/:genre" element={<BookList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
