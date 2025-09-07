import React, { useEffect, useState } from "react";
import { getCart, removeFromCart, addToCart } from "../api/cartApi";
import { Trash } from "react-bootstrap-icons";

function Cart() {
  const [cart, setCart] = useState([]);
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (!token) return alert("Please login first");
    try {
      const res = await getCart(token);
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId, token);
      fetchCart();
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  const handleIncrease = async (productId) => {
    try {
      await addToCart(productId, 1, token);
      fetchCart();
    } catch (err) {
      alert("Failed to update item");
    }
  };

  const handleDecrease = async (productId, qty) => {
    if (qty <= 1) return handleRemove(productId);
    try {
      await addToCart(productId, -1, token);
      fetchCart();
    } catch (err) {
      alert("Failed to update item");
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center mb-4"> Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center text-muted">
          <p>No items in your cart yet</p>
        </div>
      ) : (
        <>
          <div className="row">
            {cart.map((c) => (
              <div className="col-md-4 col-sm-6 mb-3" key={c.productId?._id}>
                <div className="card shadow-sm border-0 h-100" style={{ maxWidth: "280px", margin: "auto" }}>
                  {c.productId?.image && (
                    <img
                      src={c.productId.image}
                      alt={c.productId.name}
                      className="card-img-top"
                      style={{
                        height: "120px",
                        objectFit: "cover",
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px",
                      }}
                    />
                  )}
                  <div className="card-body p-2 d-flex flex-column">
                    <h6 className="fw-bold mb-1">{c.productId?.name}</h6>
                    <small className="text-muted">Price: ₹{c.productId?.price}</small>
                    <small className="mb-2">Qty: {c.quantity}</small>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div>
                        <button
                          className="btn btn-sm btn-outline-dark me-1"
                          onClick={() => handleDecrease(c.productId._id, c.quantity)}
                        >
                          -
                        </button>
                        <button
                          className="btn btn-sm btn-outline-dark me-1"
                          onClick={() => handleIncrease(c.productId._id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemove(c.productId._id)}
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Total */}
          <div className="card shadow-sm border-0 p-3 mt-3" style={{ maxWidth: "400px", margin: "auto" }}>
            <h5 className="fw-bold text-center">Total: ₹{total.toFixed(2)}</h5>
            <button className="btn btn-success w-100 mt-2">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
