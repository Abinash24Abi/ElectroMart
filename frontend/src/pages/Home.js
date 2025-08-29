import React from "react";
import Marquee from "react-fast-marquee";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import img from "../asset/s2.jpg";
import img1 from "../asset/s3.jpg";
import JourneyTimeline from "../components/JourneyTimeline";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import mobiles from "../asset/mobile.webp";
import chopper from "../asset/chopper.webp";
import soundbar from "../asset/soundbar.webp";
import watch from "../asset/watch.webp";
import microwave from "../asset/microwave.webp";
import wm from "../asset/wm.webp";

import AC from "../asset/AC.jpg";
import mobile from "../asset/phone.jpg";
import TV from "../asset/tv.jpg";

import acer from "../asset/Acer-Logo.webp";
import apple from "../asset/Apple_logo_black_(1).webp";
import godrej from "../asset/Godrej_Logo_svg.webp";
import lenovo from "../asset/Lenovo-Logo-1.webp";
import oneplus from "../asset/OnePlus_Logo.webp";
import dell from "../asset/dell.png";
import panasonic from "../asset/panasonic.png";
import philips from "../asset/philips.png";
import lg from "../asset/lg.png";
import microsoft from "../asset/microsoft.png";
import sony from "../asset/sony.png";
import samsung from "../asset/samsung.png";

const brands = [
  acer,
  apple,
  godrej,
  lenovo,
  oneplus,
  dell,
  panasonic,
  philips,
  lg,
  microsoft,
  sony,
  samsung,
];

const Home = () => {
  return (
    <div>
      
      {/* ===== Hero Section ===== */}
      <section className="bg-dark text-light text-center py-5 mt-5">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to ElectroMart</h1>
          <p className="lead">Your one-stop shop for top-quality electronics</p>
          <Link to="/productlist">
            <a href="#" className="btn btn-warning btn-lg mt-3">
              Shop Now
            </a>
          </Link>
        </div>
      </section>

      {/* ===== Auto-Sliding Carousel ===== */}
      <div
        id="heroCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={TV}
              className="d-block w-100"
              alt="Smart TVs"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>Latest Smart TVs</h5>
              <p>Experience Ultra HD clarity and smart features.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src={AC}
              className="d-block w-100"
              alt="AC Sale"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>Summer Sale on ACs</h5>
              <p>
                Cool down with the latest energy-efficient air conditioners.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img 
              src={mobile}
              className="d-block w-100"
              alt="Smartphones"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
              <h5>Smartphone Bonanza</h5>
              <p>Get the latest models at unbeatable prices.</p>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#heroCarousel"   
            data-bs-slide-to="2"  
            aria-label="Slide 3"  
          ></button>
        </div>
      </div>

      {/* ===== Featured Products Section ===== */}

      {/* ===== Featured Products Section ===== */}
      <section id="shop" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5 text-uppercase">
            Featured Electronics
          </h2>

          <div className="row g-4">
            {[
              {
                title: "Smart TV",
                desc: "Ultra HD • 4K • Smart Features",
                img: TV,
              },
              {
                title: "Air Conditioner",
                desc: "Energy Efficient • Silent Cooling",
                img: AC,
              },
              {
                title: "Smartphone",
                desc: "Latest Models • Best Cameras",
                img: mobile,
              },
            ].map((product,index) => (
              <div className="col-12 col-sm-6 col-lg-4" key={index}>
                <div className="card h-100 border-0 shadow-lg rounded-3 overflow-hidden">
                  <div className="overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="card-img-top"
                      style={{
                        height: "250px", // fixed height
                        width: "100%",
                        objectFit: "cover", // keep aspect ratio and crop excess
                        transition: "transform 0.4s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>
                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-bold">{product.title}</h5>
                      <p className="text-muted small">{product.desc}</p>
                    </div>
                    {/* <button className="btn btn-dark btn-sm px-4 mt-3">
                Buy Now
              </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Gallery Section ===== */}
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <h2 className="text-center fw-bold mb-4">Product Gallery</h2>
          <div className="row g-3 justify-content-center">
            {[mobiles, chopper, soundbar, watch, microwave, wm].map(
              (src, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-2">
                  <div className="gallery-img-wrapper shadow-sm rounded overflow-hidden">
                    <img
                      src={src}
                      alt={`Gallery Item ${index + 1}`}
                      className="w-100 h-100"
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* CSS for same image size */}
        <style>
          {`
      .gallery-img-wrapper {
        aspect-ratio: 1/1; /* makes images square */
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
      }
      .gallery-img-wrapper img {
        object-fit: cover;
      }
    `}
        </style>
      </section>

      <section className="py-5 bg-light">
        <div className="container-fluid">
          <h2 className="text-center fw-bold mb-4">Our Trusted Brands</h2>
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="py-3"
          >
            {brands.map((logo, index) => (
              <div
                key={index}
                className="mx-4 d-flex align-items-center justify-content-center"
                style={{ minWidth: "120px" }}
              >
                <img
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className="img-fluid"
                  style={{ maxHeight: "60px", objectFit: "contain" }}
                />
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      <JourneyTimeline />
      <Footer />
    </div>
  );
};

export default Home;