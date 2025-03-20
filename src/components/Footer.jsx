const Footer = () => {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-between align-items-center text-center text-sm-start px-1 px-md-5 pt-4 pb-0.5 pb-md-4 mt-4 border-top">
      <p>© 2024 Company, Inc. All rights reserved.</p>
      <p>ContactUs @ n210699@rguktn.ac.in</p>
      <ul className="list-unstyled d-flex">
        <li className="ms-3">
          <a className="link-body-emphasis" href="#">
            <i className="bi bi-twitter fs-4"></i>
          </a>
        </li>
        <li className="ms-3">
          <a className="link-body-emphasis" href="#">
            <i className="bi bi-instagram fs-4"></i>
          </a>
        </li>
        <li className="ms-3">
          <a className="link-body-emphasis" href="#">
            <i className="bi bi-facebook fs-4"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
