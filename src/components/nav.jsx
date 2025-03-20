import { useState } from "react";
import "../App.css";
const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const shownav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        aria-label="Fifth navbar example"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <span className="text-primary LOGO">Compify</span>
          </a>
          <button className="navbar-toggler" type="button" onClick={shownav}>
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarsExample05"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item d-block mx-4 d-md-none">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  onClick={() => {
                    const phoneNumber = "917095658244"; // Change to your number (with country code)
                    window.open(`https://wa.me/${phoneNumber}`, "_blank");
                  }}
                >
                  Contact Us
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
