import React, { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { useProducts } from '../Context/ProductContext';
import '../Css/SearchAndFilter.css';

const SearchAndFilter = () => {
  const { searchTerm, filters, searchProducts, applyFilters, clearFilters } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const handleSearchChange = (e) => {
    searchProducts(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...localFilters, [filterType]: value };
    setLocalFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({ category: '', priceRange: '', sortBy: '' });
    clearFilters();
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== '');

  return (
    <div className="search-filter-container">
      {/* Search Bar */}
      <div className="search-bar">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => searchProducts('')}
              className="clear-search-btn"
              title="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
        <button
          className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          Filters
          {hasActiveFilters && <span className="filter-count">!</span>}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button onClick={handleClearFilters} className="clear-filters-btn">
                Clear All
              </button>
            )}
          </div>

          <div className="filters-grid">
            {/* Category Filter */}
            <div className="filter-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={localFilters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                <optgroup label="Electronics">
                  <option value="phones">Phones</option>
                  <option value="laptops">Laptops</option>
                  <option value="tablets">Tablets</option>
                  <option value="audio">Headphones & Audio</option>
                  <option value="smartwatches">Smartwatches</option>
                </optgroup>
                <optgroup label="Clothing & Fashion">
                  <option value="hoodies">Hoodies</option>
                  <option value="t-shirts">T-Shirts</option>
                  <option value="pants">Pants</option>
                  <option value="jackets">Jackets</option>
                  <option value="sweaters">Sweaters</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </optgroup>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="filter-group">
              <label htmlFor="priceRange">Price Range</label>
              <select
                id="priceRange"
                value={localFilters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="filter-select"
              >
                <option value="">Any Price</option>
                <option value="0-50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-300">$100 - $300</option>
                <option value="300-500">$300 - $500</option>
                <option value="500-1000">$500 - $1000</option>
                <option value="1000-5000">$1000+</option>
              </select>
            </div>

            {/* Sort By Filter */}
            <div className="filter-group">
              <label htmlFor="sortBy">Sort By</label>
              <select
                id="sortBy"
                value={localFilters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="filter-select"
              >
                <option value="">Default</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="active-filters">
              <h4>Active Filters:</h4>
              <div className="active-filter-tags">
                {localFilters.category && (
                  <span className="filter-tag">
                    Category: {localFilters.category}
                    <button
                      onClick={() => handleFilterChange('category', '')}
                      className="remove-filter-btn"
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}
                {localFilters.priceRange && (
                  <span className="filter-tag">
                    Price: {localFilters.priceRange}
                    <button
                      onClick={() => handleFilterChange('priceRange', '')}
                      className="remove-filter-btn"
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}
                {localFilters.sortBy && (
                  <span className="filter-tag">
                    Sort: {localFilters.sortBy}
                    <button
                      onClick={() => handleFilterChange('sortBy', '')}
                      className="remove-filter-btn"
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
