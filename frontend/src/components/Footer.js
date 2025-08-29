import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4">
      <div className="container text-md-left">
        <div className="row text-md-left">
          
          {/* Logo & About */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="mb-4 fw-bold text-warning">ElectroMart ⚡</h5>
            <p>
              Your one-stop shop for all things electronics — from gadgets to home appliances,
              bringing technology to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="mb-4 fw-bold text-warning">Quick Links</h5>
            <p><a href="/" className="text-light text-decoration-none">Home</a></p>
            <p><a href="/shop" className="text-light text-decoration-none">Shop</a></p>
            <p><a href="/offers" className="text-light text-decoration-none">Offers</a></p>
            <p><a href="/contact" className="text-light text-decoration-none">Contact</a></p>
          </div>

          {/* Categories */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="mb-4 fw-bold text-warning">Categories</h5>
            <p><a href="/mobiles" className="text-light text-decoration-none">Mobiles</a></p>
            <p><a href="/laptops" className="text-light text-decoration-none">Laptops</a></p>
            <p><a href="/tv" className="text-light text-decoration-none">Smart TVs</a></p>
            <p><a href="/appliances" className="text-light text-decoration-none">Appliances</a></p>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="mb-4 fw-bold text-warning">Contact</h5>
            <p><i className="bi bi-house-door-fill me-2"></i> 123 ABC Street, Ranipet</p>
            <p><i className="bi bi-envelope-fill me-2"></i> product@electromart.com</p>
            <p><i className="bi bi-telephone-fill me-2"></i> +91 98765 43210</p>
            <p><i className="bi bi-clock-fill me-2"></i> Mon - Sat, 9AM - 8PM</p>
          </div>
        </div>

        <hr className="mb-4 mt-4" />

        {/* Social Media */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="mb-0">
              © {new Date().getFullYear()} <strong className="text-warning">ElectroMart</strong> | All Rights Reserved
            </p>
          </div>

          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-right">
              <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-light me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
