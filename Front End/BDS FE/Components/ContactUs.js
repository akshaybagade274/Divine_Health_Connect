import React, { useEffect, useState } from "react";
import "../CSS/ContactUs.css";
function ContactUs() {

    const [state, setState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",

    });

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const { name, email, subject, message } = state;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !subject || !message) {
            alert("Please provide value in each input field");
        } else {

            setState({ name: "", email: "", subject: "", message: "" });

        }
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };



    return (
        <>


            <section className="contact-section my-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-10 ">
                            <div className="wrapper ">
                                <div className="row no-gutters ">
                                    <div className="col-md-6 ">
                                        <div className="contact-wrap w-100 p-lg-5 p-4 ">
                                            <h3 className="mb-4 " style={{ color: "#d62196" }}>Send us a message</h3>
                                            <form
                                                id="contactForm"
                                                className="contactForm"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" class="input-control" placeholder="Name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" class="input-control" placeholder="Email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" class="input-control" placeholder="Subject" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea type="text" class="input-control" style={{ height: "7rem" }} placeholder="Message" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12" >
                                                        <div className="form-group" >
                                                            <input
                                                                type="button"
                                                                value="Send Message"
                                                                className="btn1 btn-primary1"

                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-stretch">
                                        <div className="info-wrap w-100 p-lg-5 p-4 img">
                                            <h3 style={{ borderBottom: " 2px solid #d62196", paddingBottom: "5px" }}>Contact us</h3>
                                            <p className="mb-4">
                                                We're open for any suggestion or just to have a chat
                                            </p>
                                            <div className="dbox w-100 d-flex align-items-start" >

                                                <div className="text pl-3" style={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "20px",
                                                    lineHeight: 1.8, fontWeight: "400", textAlign: "left"
                                                }}>
                                                    <p>
                                                        <span >Address : </span><a target={"_blank"} href="https://www.google.com/maps/dir//Centre+For+Development+Of+Advanced+Computing,+Innovation+Park,+Innovation+Park+34,+B%2F1,+Panchawati+Rd,+Panchawati,+Pashan,+Pune,+Maharashtra+411008/@18.5349864,73.8109561,21z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc2bf40bef092f1:0x48c508ccaa4ef9a!2m2!1d73.81103!2d18.5348932">C-DAC ACTS,
                                                            C-DAC Innovation Park,
                                                            Panchavati, Pashan,
                                                            Pune - 411 008, Maharashtra (India) </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">

                                                <div className="text pl-3" style={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "20px",
                                                    lineHeight: 1.8, fontWeight: "400", textAlign: "left"
                                                }}>
                                                    <p>

                                                        <span>Phone : </span>
                                                        <a href="tel://123456789">+91 8308853970</a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">

                                                <div className="text pl-3" style={{
                                                    fontFamily: "Poppins",
                                                    fontSize: "20px",
                                                    lineHeight: 1.8, fontWeight: "400", textAlign: "left"
                                                }}>
                                                    <p>
                                                        <span>Email : </span>
                                                        <a href="actshospital@gmail.com">
                                                            actsbds@gmail.com
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="fa fa-globe"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}

export default ContactUs;
