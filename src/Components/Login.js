import { useEffect, useState } from "react";
import AuthenticationService from "../service/AuthenticationService";
import ReCAPTCHA from "react-google-recaptcha";
import swal from "sweetalert";


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verified, setVerified] = useState(true);


    useEffect(() => {
        if (AuthenticationService.isUserLoggedIn())
            AuthenticationService.removeUserDetails()
    }, [])


    const login = (e) => {
        e.preventDefault();
        if (verified) {
            var body = {
                email,
                password
            }
            console.log(body);



            AuthenticationService.authenticateUser(body)
                .then((response) => {
                    // console.log("deatils from back end : " + JSON.stringify(response.data))
                    //  async function set() {
                    AuthenticationService.storeUserDetails(email);
                    props.history.push("/viewprofile")
                    // }
                    // set()
                    // async function log() {
                    //     await set()
                    //     props.history.push("/viewprofile")
                    // }

                    // log()

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


    return (
        <div>
            <div className="Container-fluid my-5" style={{ background: "linear-gradient(to left,white,#C6F1EE)" }}>
                <div className="row justify-content-center align-items-center" style={{ height: "70vh", width: "85%" }}>

                    <div className="col-2"></div>
                    <form className="col-4 p-4  " style={{ background: "white", boxShadow: "6px 3px 15px black" }}>

                        <input className="form-control my-3" type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />

                        <input className="form-control my-3" placeholder="Password" type="password" onChange={(e) => { setPassword(e.target.value) }} />
                        <div class="col-md-12">
                            <div className="g-recaptcha">
                                <ReCAPTCHA className=" "
                                    sitekey="6Lfrax4iAAAAABadMXxapncuCo4Fw422WEuOggjj"
                                    onChange={onChange}
                                />

                            </div>

                        </div>
                        <input className="form-control btn btn-primary btn-md my-3 show" style={{ marginLeft: "0px" }} type="button" value="Login" onClick={login} />
                        <p className=" my-3 text-center">New User? <a href="/register">Signup</a></p>


                    </form>

                    {/* <button onClick={(email) => TestService.getMessageFromAPI(email)}>Click here</button> */}
                </div>

            </div>
        </div>
    )
}


export default Login;