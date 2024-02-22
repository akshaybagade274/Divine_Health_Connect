import { useEffect, useState } from "react";
import AuthenticationService from "../service/AuthenticationService";
import ReCAPTCHA from "react-google-recaptcha";
import swal from "sweetalert";
import NavBar from "./NavBar";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verified, setVerified] = useState(false);
    useEffect(() => {
        if (AuthenticationService.isUserLoggedIn())
            AuthenticationService.removeUserDetails()
    }, [])

    const login = (e) => {
        if (verified) {
            var body = {
                email,
                password
            }
            console.log(body);


            AuthenticationService.authenticateUser(body)
                .then(response => {

                    AuthenticationService.storeUserDetails(email, response.data.jwt, response.data.role, JSON.stringify(response.data.user), response.data.user.id);
                    console.log("In Login")
                    swal("Login Info", "Login Successfull", "success")
                    if (sessionStorage.getItem('user_role') === 'ROLE_PATIENT') {
                        props.history.push("/patient")
                    }
                    if (sessionStorage.getItem('user_role') === 'ROLE_ADMIN')
                        props.history.push("/admin")
                    if (sessionStorage.getItem('user_role') === 'ROLE_STAFF')
                        props.history.push("/staff")

                })
                .catch(error => {
                    console.log(error)
                    swal("Login Failed!!", "Bad Credentials", "error")

                });



        }
        else
            swal("Capctha Not selected", "Select Captcha", "error")

    }
    function onChange(value) {
        setVerified(true);
    }

    const staffSchedule = (e) => {



    }

    return (
      <div>
        <NavBar />
        <div
          className="Container-fluid "
          style={{ background: "linear-gradient(to left,white,#63c977)" }}
        >
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "70vh", width: "85%" }}
          >
            {/* <Header />
            <h1>Hospital Management System Frontend</h1>
            <LoginComponent />
            <h2>This is just Begining</h2> */}
            <div className="col-2"></div>
            <form
              className="col-4 p-4  "
              style={{ background: "white", boxShadow: "6px 3px 15px black" }}
            >
              <input
                className="form-control my-3"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                className="form-control my-3"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <div className="col-md-12">
                <div className="g-recaptcha">
                  <ReCAPTCHA
                    className=" "
                    sitekey="6Lfrax4iAAAAABadMXxapncuCo4Fw422WEuOggjj"
                    onChange={onChange}
                  />
                </div>
              </div>
              <input
                className="form-control btn btn-primary btn-md my-3 show"
                type="button"
                value="Login"
                onClick={login}
              ></input>
              <p className=" my-3 text-center">
                New User? <a href="/register">Signup</a>
              </p>
            </form>

            {/* <button onClick={(email) => TestService.getMessageFromAPI(email)}>Click here</button> */}
          </div>
        </div>
      </div>
    );
}


export default Login;