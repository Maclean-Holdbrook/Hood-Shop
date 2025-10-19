import React from "react";
import { useProducts } from "../Context/ProductContext";
import ProductCard from "./ProductCard";
import Loading from "./Loading";
import SearchAndFilter from "./SearchAndFilter";
import "../Css/ProductList.css";

const ProductList = ({ title = "All Products", showSearchAndFilter = true }) => {
  const { loading, error, getFilteredProducts } = useProducts();
  const products = getFilteredProducts();

  if (loading) {
    return (
      <div className="product-list-container">
        <Loading size="large" message="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-message">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {showSearchAndFilter && <SearchAndFilter />}
      
      <div className="product-list-header">
        <h2 className="product-list-title">{title}</h2>
        <p className="product-count">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <h3>No products found</h3>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;