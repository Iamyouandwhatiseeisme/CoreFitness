import React from "react";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import "./index.css";

function About() {
  return (
    <div className="about-page">
      <Header />
      <div className="about-content">
        <p>
          This project is a test project for TbcXUsaid React course assignments.
        </p>
        <p>
          The application consists of several pages. Mainly - Content (Welcone)
          page, About page and contact page. All three pages represent a single
          React page.
        </p>
        <p>
          The welcome page showcases medicinal mushroom species that "can" be
          bought from the web-site, photos, info and "Add-to-cart" button for
          each of them.
        </p>
        <p>
          Contact page is a page that consists of a text area for contacting the
          vendor for futher questions and advises.
        </p>
        <p>About page is a page that consists of explanation of the project.</p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
