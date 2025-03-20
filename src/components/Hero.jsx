import photoimg from "../assets/retro-camera-isolated.png";
import styles from "./Hero.module.css";
import React, { useState } from "react";

const Hero = () => {
  return (
    <>
      <div
        className={`row p-2 pb-0 pe-lg-0 pt-lg-0 align-items-center rounded-3 border shadow-lg`}
      >
        <div className={`${styles.Hero_Text} col-lg-7 p-3 p-lg-5 pt-5 mt-5`}>
          <h1
            className={`${styles.Hero_Text} display-4 fw-bold lh-1 text-body-emphasis`}
          >
            Image Compressor
          </h1>
          <p className={`${styles.Hero_Text} lead`}>
            Easily compress and optimize images with our powerful tool. Reduce
            file size while maintaining quality using advanced compression
            techniques. Perfect for web, social media, and storage efficiency!
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
            >
              Premium
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Free
            </button>
          </div>
        </div>
        <div className="d-none d-lg-block col-lg-4 pt-0 offset-lg-1 overflow-hidden shadow-lg">
          <img
            src={photoimg}
            alt=""
            width="100%"
            className={`${styles.photo}`}
          />
        </div>
      </div>
      ;
    </>
  );
};

export default Hero;
