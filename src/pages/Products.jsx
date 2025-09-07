import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import { addToCart } from '../api/cartApi';

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams();
      if (category) query.append('category', category);
      if (minPrice) query.append('minPrice', minPrice);
      if (maxPrice) query.append('maxPrice', maxPrice);

      const res = await getProducts(query.toString());
      setProducts(res.data);
    } catch (err) {
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Please login first');
    try {
      await addToCart(productId, 1, token);
      alert('Added to cart');
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold text-center text-dark"> Our Products</h2>

      {/* Filter Section */}
      <div className="card shadow-sm p-4 mb-5">
        <h5 className="fw-semibold mb-3">Filter Products</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              placeholder="Category"
              className="form-control rounded-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              placeholder="Min Price"
              className="form-control rounded-3"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              placeholder="Max Price"
              className="form-control rounded-3"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-dark rounded-3 fw-semibold" onClick={fetchProducts}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4">
                {p.image && (
                  <img
                    src={p.image}
                    className="card-img-top rounded-top-4"
                    alt={p.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{p.name}</h5>
                  <p className="card-text text-muted">{p.description}</p>
                   <p className="card-text text-muted">{p.category}</p>
                  <p className="card-text fw-bold text-success mb-3">₹{p.price}</p>
                  <button
                    className="btn btn-outline-dark w-100 mt-auto rounded-3 fw-semibold"
                    onClick={() => handleAddToCart(p._id)}
                  >
                    Add to Cart 
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Products;
