import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header.js';
import MovieCard from './components/MovieCard.js';
import Pagination from './components/Pagination.js';
import { fetchMovies, searchMovies } from './services/tmdbApi.js';
import './styles/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadMovies = useCallback(async (page = 1, query = searchQuery) => {
    setLoading(true);
    setError('');
    
    try {
      const data = query 
        ? await searchMovies(query, page)
        : await fetchMovies(page);
      
      let sortedMovies = data.results || [];
      
      // Apply sorting
      if (sortBy) {
        sortedMovies = [...sortedMovies].sort((a, b) => {
          if (sortBy === 'release_date_asc') return new Date(a.release_date || 0) - new Date(b.release_date || 0);
          if (sortBy === 'release_date_desc') return new Date(b.release_date || 0) - new Date(a.release_date || 0);
          if (sortBy === 'rating_asc') return a.vote_average - b.vote_average;
          if (sortBy === 'rating_desc') return b.vote_average - a.vote_average;
          return 0;
        });
      }
      
      setMovies(sortedMovies);
      setTotalPages(data.total_pages || 1);
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortBy]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== '') {
        setCurrentPage(1);
        loadMovies(1, searchQuery);
      } else {
        loadMovies(1, '');
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, loadMovies]);

  // Load movies on initial render and when sort changes
  useEffect(() => {
    loadMovies(currentPage);
  }, [sortBy, loadMovies]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handlePageChange = (page) => {
    loadMovies(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container">
      <Header 
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        sortBy={sortBy}
      />
      
      <div className="movies-container">
        {loading && <div className="loading">Loading movies...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {!loading && !error && movies.length === 0 && (
          <div className="no-results">No movies found. Try a different search.</div>
        )}
        
        {!loading && !error && movies.length > 0 && (
          <>
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </>
        )}
      </div>

      {!loading && !error && movies.length > 0 && totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default App;