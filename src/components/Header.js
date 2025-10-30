import React from 'react';

const Header = ({ onSearchChange, onSortChange, sortBy }) => {
  return (
    <div className="header-style">
      <h1>Movie Explorer</h1>
      <div className="controls-container">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search for a movie..."
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="sort-container">
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="release_date_asc">Release Date (Asc)</option>
            <option value="release_date_desc">Release Date (Desc)</option>
            <option value="rating_asc">Rating (Asc)</option>
            <option value="rating_desc">Rating (Desc)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;