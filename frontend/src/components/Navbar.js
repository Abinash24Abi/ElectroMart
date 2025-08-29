import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "react-use-cart";
import { FiShoppingCart, FiUser, FiLogOut, FiSearch } from "react-icons/fi";
import { BiUserCircle, BiPurchaseTag} from "react-icons/bi";
import { AiOutlineHome, AiOutlineDashboard } from "react-icons/ai";
import { useState,useEffect } from "react";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark fixed-top py-2 ${
        scrolled ? "bg-dark shadow-sm" : "bg-transparent"
      }`}
     style={{
  backgroundImage: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)',
  transition: 'all 0.3s ease'
}}

    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/">
          <span className="text-warning me-2">⚡</span>
          <span className="text-white">ElectroMart</span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <form
            onSubmit={handleSearch}
            className="d-flex mx-auto my-2 my-lg-0 me-lg-3"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <div className="input-group">
              <input
                type="search"
                className="form-control rounded-pill-start border-0 px-3 shadow-sm bg-light"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-warning rounded-pill-end px-3 shadow-sm" type="submit">
                <FiSearch size={18} />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item d-lg-none">
              <Link className="nav-link" to="/">
                <AiOutlineHome size={20} className="me-1" />
                Home
              </Link>
            </li>

            {/* Cart Link (now goes to separate page) */}
            <li className="nav-item me-2">
              <Link 
                className="nav-link position-relative p-2" 
                to="/cart"
                aria-label="Cart"
              >
                <FiShoppingCart size={20} className="text-white" />
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {!user ? (
              <>
                <li className="nav-item me-2">
                  <Link className="btn btn-outline-light btn-sm px-3 fw-bold rounded-pill" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning btn-sm px-3 fw-bold text-dark rounded-pill" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle d-flex align-items-center bg-transparent border-0"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                >
                  <BiUserCircle size={22} className="me-1 text-white" />
                  <span className="d-none d-lg-inline text-white">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow-lg rounded-3 border-0">
                  <li>
                    <Link className="dropdown-item d-flex align-items-center py-2" to="/profile">
                      <FiUser className="me-2" />
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item d-flex align-items-center py-2" to="/orders">
                      <BiPurchaseTag className="me-2" />
                      My Orders
                    </Link>
                  </li>
                  {user.isAdmin && (
                    <li>
                      <Link className="dropdown-item d-flex align-items-center py-2" to="/admin">
                        <AiOutlineDashboard className="me-2" />
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center py-2 text-danger"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;