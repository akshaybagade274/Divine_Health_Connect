import React from "react";

import '../CSS/footer.css'

export default function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="text-center text-lg-start bg-light text-muted ">
          <section>
            <div className="boxfooter text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i
                      className="fas fa-gem me-3"
                      style={{ color: "white" }}
                    ></i>
                    DivineHealth Connect
                  </h6>
                  <p style={{ color: "white" }}>
                    This is CDAC-Kharghar's student's academic project. <br />
                    <br />
                    Devoleped by :
                  </p>
                  <br></br>
                  <ul>
                    <li>Anupama Mistry</li>
                    <li>Akshay Bagade</li>
                    <li>Nilesh Malekar</li>
                    <li>Tejas Wakchaure</li>
                    <li>Anshal Khatri</li>
                    <li>Roshan Wagh</li>
                  </ul>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    Technologies used:
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">
                      React
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      MySQL
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      SpringBoot
                    </a>
                  </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                  <p>
                    <a href="#!" className="text-reset">
                      Hospitals near me
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Hospitals in Pune
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Hospitals in Delhi
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">
                      Hospitals in Mumbai
                    </a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact US</h6>
                  <p>
                    <i className="bi bi-house-door"></i>&nbsp; Kharghar,
                    Navi Mumbai
                  </p>
                  <p>
                    <i className="bi bi-envelope"></i>
                    <a
                      href="mailto:someone@example.com"
                      className="text-decoration-none"
                    >
                      <span style={{ color: "white" }}>
                        &nbsp;&nbsp;divinehms@gmail.com
                      </span>
                    </a>
                  </p>
                  <p>
                    <i className="bi bi-telephone"></i> +91 7999946152{" "}
                  </p>
                  <p>
                    <i className="bi bi-telephone"></i> +91 7030507508
                  </p>
                  <p>
                    <i className="bi bi-telephone"></i> +91 9867415337
                  </p>
                  <p>
                    <i className="bi bi-telephone"></i> +91 9284671730
                  </p>
                  <p>
                    <i className="bi bi-telephone"></i> +91 9458434706
                  </p>
                  <p>
                    <i className="bi bi-telephone"></i> +91 9765506228
                  </p>
                </div>
                <div className="text-center p-4">
                  © 2023 Copyright:
                  <a className="text-reset fw-bold" href="/">
                    {" "}
                    DivineHealth Connect
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

