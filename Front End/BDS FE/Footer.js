import React from "react";

import './footer.css'

export default function Footer() {
  return (
    <div>
      <div className="footer" >
        <div className="text-center text-lg-start bg-light text-muted " >
          <section >
            <div className="boxfooter text-center text-md-start mt-5" >
              <div className="row mt-2">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <i className="fas fa-gem me-3" style={{ color: "white" }}></i>Hospital Management System
                  </h6>
                  <p style={{ color: "white" }}>
                    This is CDAC-ACTS's student's academic project. <br /><br />
                    Devoleped by :
                    <br></br><ul><li>Abhijit Chavan</li><li>Akash Madke</li><li>Vinit Gunjal</li><li>Tushar Gaikwad</li></ul>
                  </p>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4"  >
                    Technologies used:
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">React</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">MySQL</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">SpringBoot</a>
                  </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4" >
                    Useful links
                  </h6>
                  <p>
                    <a href="#!" className="text-reset">Hospitals near me</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Hospitals in Pune</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Hospitals in Delhi</a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset">Hospitals in Mumbai</a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact US</h6>
                  <p><i class="bi bi-house-door"></i>&nbsp;   Panchawati, Pashan, Pune</p>
                  <p>
                    <i class="bi bi-envelope"></i>
                    <a href="mailto:someone@example.com" className="text-decoration-none"><span style={{ color: 'white' }}>&nbsp;&nbsp;actshms@gmail.com</span></a>
                  </p>
                  <p><i class="bi bi-telephone"></i> +91 95459 68256 </p>
                  <p><i class="bi bi-telephone"></i> +91 93099 59490</p>
                  <p><i class="bi bi-telephone"></i> +91 88059 72881</p>
                  <p><i class="bi bi-telephone"></i> +91 95958 75539</p>
                </div>
                <div className="text-center p-4">
                  © 2022 Copyright:
                  <a className="text-reset fw-bold" href="/"> Hospital management System</a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>

  );
};

