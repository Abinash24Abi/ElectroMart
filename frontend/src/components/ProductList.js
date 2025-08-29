import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from 'react-use-cart';
import { 
  FiShoppingCart, 
  FiInfo, 
  FiSearch,
  FiFilter,
  FiStar,
  FiDollarSign,
  FiPercent
} from 'react-icons/fi';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const { addItem, totalItems, inCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProducts(); 
  }, []);

  const categories = ['all', ...new Set(products.map(product => product.category))];

  useEffect(() => {
    let result = [...products];
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    switch(sortOption) {
      case 'price-low':
        result.sort((a, b) => (a.price - a.discount) - (b.price - b.discount));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price - b.discount) - (a.price - a.discount));
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortOption]);

  const handleAddToCart = (product) => {
    if (product.stock <= 0) return;
    
    const item = {
      id: product._id,
      name: product.name,
      price: product.price - (product.price * product.discount / 100),
      brand: product.brand,
      imageUrl: product.imageUrl,
      discount: product.discount,
      originalPrice: product.price
    };
    
    addItem(item);
    setToastMessage(`${product.name} added to cart`);
    setShowToast(true);
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4 mt-5">
      {/* Search and Filter Section */}
      <div className="row mb-4 g-3">
        <div className="col-md-8">
          <div className="input-group shadow-sm">
            <span className="input-group-text">
              <FiSearch />
            </span>
            <input
              type="search"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="col-md-2">
          <div className="dropdown">
            <button 
              className="btn btn-outline-secondary dropdown-toggle w-100 shadow-sm" 
              type="button" 
              id="categoryDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <FiFilter className="me-1" /> 
              {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
            </button>
            <ul className="dropdown-menu w-100" aria-labelledby="categoryDropdown">
              <li>
                <button 
                  className={`dropdown-item ${selectedCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  All Categories
                </button>
              </li>
              {categories.filter(c => c !== 'all').map(category => (
                <li key={category}>
                  <button 
                    className={`dropdown-item ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="col-md-2">
          <div className="dropdown">
            <button 
              className="btn btn-outline-secondary dropdown-toggle w-100 shadow-sm" 
              type="button" 
              id="sortDropdown" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              {sortOption === 'featured' && <FiStar className="me-1" />}
              {sortOption === 'price-low' && <FiDollarSign className="me-1" />}
              {sortOption === 'price-high' && <FiDollarSign className="me-1" />}
              {sortOption === 'discount' && <FiPercent className="me-1" />}
              {sortOption === 'featured' && 'Featured'}
              {sortOption === 'price-low' && 'Price: Low'}
              {sortOption === 'price-high' && 'Price: High'}
              {sortOption === 'discount' && 'Discount'}
            </button>
            <ul className="dropdown-menu w-100" aria-labelledby="sortDropdown">
              <li>
                <button 
                  className={`dropdown-item ${sortOption === 'featured' ? 'active' : ''}`}
                  onClick={() => setSortOption('featured')}
                >
                  <FiStar className="me-1" /> Featured
                </button>
              </li>
              <li>
                <button 
                  className={`dropdown-item ${sortOption === 'price-low' ? 'active' : ''}`}
                  onClick={() => setSortOption('price-low')}
                >
                  <FiDollarSign className="me-1" /> Price: Low to High
                </button>
              </li>
              <li>
                <button 
                  className={`dropdown-item ${sortOption === 'price-high' ? 'active' : ''}`}
                  onClick={() => setSortOption('price-high')}
                >
                  <FiDollarSign className="me-1" /> Price: High to Low
                </button>
              </li>
              <li>
                <button 
                  className={`dropdown-item ${sortOption === 'discount' ? 'active' : ''}`}
                  onClick={() => setSortOption('discount')}
                >
                  <FiPercent className="me-1" /> Best Discount
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {filteredProducts.map(product => (
          <div className="col" key={product._id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="position-relative">
                <img
                  src={`http://localhost:5000${product.imageUrl}`}
                  className="card-img-top p-3 bg-light"
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                {product.discount > 0 && (
                  <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    {product.discount}% OFF
                  </span>
                )}
                {inCart(product._id) && (
                  <span className="badge bg-success position-absolute top-0 end-0 m-2">
                    In Cart
                  </span>
                )}
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fs-6">{product.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted small">{product.brand}</h6>
                <div className="mt-auto">
                  <div className="d-flex align-items-center mb-2">
                    <span className="h5 mb-0 text-primary">
                      ${(product.price - (product.price * product.discount / 100)).toFixed(2)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-decoration-line-through text-muted ms-2 small">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="d-flex justify-content-between">
                    <button
                      className={`btn btn-sm flex-grow-1 me-2 ${inCart(product._id) ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock <= 0}
                    >
                      {product.stock <= 0 ? 'Out of Stock' : 
                       inCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                    <Link 
                      to={`/product/${product._id}`} 
                      className="btn btn-outline-secondary btn-sm d-flex align-items-center"
                    >
                      <FiInfo className="me-1" /> Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-5">
          <h4>No products found</h4>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Cart Floating Button */}
      {totalItems > 0 && (
        <Link 
          to="/cart" 
          className="position-fixed bottom-0 end-0 m-4 btn btn-primary rounded-circle p-3 shadow-lg"
          style={{ zIndex: 1000 }}
        >
          <FiShoppingCart size={24} />
          <span 
            className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger"
          >
            {totalItems}
          </span>
        </Link>
      )}

      {/* Toast Notification */}
      <div 
        className={`toast align-items-center text-white bg-success position-fixed bottom-0 start-50 translate-middle-x mb-3 ${showToast ? 'show' : ''}`}
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body d-flex align-items-center">
            <FiShoppingCart className="me-2" />
            {toastMessage}
          </div>
          <button 
            type="button" 
            className="btn-close btn-close-white me-2 m-auto" 
            onClick={() => setShowToast(false)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;