function NavBar() {

    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-light">
          <div
            className="container-fluid"
            style={{
              backgroundColor: "#c5ed31",
              height: "8vh",
              width: "100vw",
            }}
          >
            <a
              className="navbar-brand"
              href="/"
              style={{ color: "#2C75A6", marginRight: "2%" }}
            >
              Home
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/login"
                    style={{ color: "#2C75A6" }}
                  >
                    <strong>Book Appointment</strong>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="login"
                    style={{ color: "#2C75A6" }}
                  >
                    <strong>Login</strong>
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "#2C75A6" }}
                  >
                    24*7 Services
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        style={{ color: "#2C75A6" }}
                      >
                        Emergency Services
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        style={{ color: "#2C75A6" }}
                      >
                        Pathalogy
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        style={{ color: "#2C75A6" }}
                      >
                        Dialysis
                      </a>
                    </li>

                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        style={{ color: "#2C75A6" }}
                      >
                        Ambulance
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="register"
                    style={{ color: "#2C75A6" }}
                  >
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="careers"
                    style={{ color: "#2C75A6" }}
                  >
                    <strong>Careers</strong>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="healthPlans"
                    style={{ color: "#2C75A6" }}
                  >
                    <strong>Health Plans</strong>
                  </a>
                </li>
              </ul>
              <div className="d-flex">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="aboutus"
                      style={{ color: "#2C75A6" }}
                    >
                      <strong>About us</strong>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="contactus"
                      style={{ color: "#2C75A6" }}
                    >
                      <strong>Contact us</strong>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
}

export default NavBar;