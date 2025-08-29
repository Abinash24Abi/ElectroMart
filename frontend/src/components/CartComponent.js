import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { FiShoppingCart, FiX, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';

const CartPage = () => {
  const { 
    items, 
    totalItems, 
    cartTotal, 
    updateItemQuantity, 
    removeItem,
    emptyCart
  } = useCart();

  return (
    <div className="container py-5 mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom py-3">
              <div className="d-flex align-items-center justify-content-between">
                <h2 className="h5 mb-0 fw-bold">
                  <FiShoppingCart className="me-2" />
                  Your Cart ({totalItems})
                </h2>
                <Link to="/" className="btn btn-sm btn-outline-secondary">
                  <FiArrowLeft className="me-1" /> Continue Shopping
                </Link>
              </div>
            </div>

            <div className="card-body p-0">
              {items.length === 0 ? (
                <div className="text-center py-5">
                  <FiShoppingCart size={48} className="text-muted mb-3" />
                  <h5>Your cart is empty</h5>
                  <p className="text-muted mb-4">
                    Start shopping to add items to your cart
                  </p>
                  <Link to="/products" className="btn btn-warning px-4 rounded-pill">
                    Browse Products
                  </Link>
                </div>
              ) : (
                <>
                  <div className="list-group list-group-flush">
                    {items.map((item) => (
                      <div key={item.id} className="list-group-item py-3 px-4">
                        <div className="d-flex align-items-center">
                          <img
                            src= {`http://localhost:5000${item.imageUrl}`}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-3 me-3"
                            style={{ objectFit: 'cover' }}
                          />
                          <div className="flex-grow-1">
                            <h6 className="mb-1 fw-bold">{item.name}</h6>
                            <small className="text-muted d-block">{item.brand}</small>
                            <div className="d-flex align-items-center justify-content-between mt-2">
                              <div className="d-flex align-items-center">
                                <button
                                  className="btn btn-outline-secondary btn-sm px-2 py-0"
                                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <FiMinus size={14} />
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                  className="btn btn-outline-secondary btn-sm px-2 py-0"
                                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                >
                                  <FiPlus size={14} />
                                </button>
                              </div>
                              <div className="text-end">
                                <div className="fw-bold">
                                  ₹{((item.price - item.price * (item.discount / 100)) * item.quantity).toFixed(2)}
                                </div>
                                {item.discount > 0 && (
                                  <small className="text-danger">
                                    Save ₹{(item.price * (item.discount / 100) * item.quantity).toFixed(2)}
                                  </small>
                                )}
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn btn-link text-danger p-0 ms-2"
                            onClick={() => removeItem(item.id)}
                          >
                            <FiX size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card-footer bg-white border-top p-4">
                    <div className="d-flex justify-content-between mb-3">
                      <span>Subtotal:</span>
                      <span className="fw-bold">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                      <span>Shipping:</span>
                      <span className="fw-bold text-success">FREE</span>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold fs-5">₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-grid gap-2">
                      <Link to="/checkout" className="btn btn-warning py-2 fw-bold">
                        Proceed to Checkout
                      </Link>
                      <button
                        className="btn btn-outline-danger py-2"
                        onClick={() => {
                          if(window.confirm('Are you sure you want to clear your cart?')) {
                            emptyCart();
                          }
                        }}
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
