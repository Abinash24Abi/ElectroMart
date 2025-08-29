import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

const JourneyTimeline = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const milestones = [
    {
      year: "2025",
      title: "ElectroMart Launch",
      desc: "Opened our first store with premium gadgets & electronics.",
      icon: "⚡",
      bg: "#0d6efd",
    },
    {
      year: "2025",
      title: "Happy Customers",
      desc: "Achieved a milestone with amazing customer feedback.",
      icon: "🎯",
      bg: "#198754",
    },
    {
      year: "2025",
      title: "Smart Partnership",
      desc: "Partnered with top brands like Samsung, LG, and Sony.",
      icon: "🤝",
      bg: "#fd7e14",
    },
    {
      year: "2025",
      title: "Global Shipping",
      desc: "Started delivering to 15+ countries worldwide.",
      icon: "🌎",
      bg: "#6f42c1",
    },
  ];

  return (
    <section className="py-5" style={{ background: "#f8f9fa" }}>
      <div className="container">
        <h2 className="text-center fw-bold mb-5 text-primary">
          Our ElectroMart Journey
        </h2>
        <div className="row g-4">
          {milestones.map((item, index) => (
            <div
              className="col-12 col-md-6 col-lg-3"
              key={index}
              data-aos="zoom-in"
            >
              <div
                className="card text-white shadow-lg h-100 border-0"
                style={{
                  background: item.bg,
                  borderRadius: "15px",
                  transition: "0.3s",
                }}
              >
                <div className="card-body text-center p-4">
                  <div
                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      width: "70px",
                      height: "70px",
                      fontSize: "2rem",
                    }}
                  >
                    {item.icon}
                  </div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <h6 className="fw-light">{item.year}</h6>
                  <p className="mt-2">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;