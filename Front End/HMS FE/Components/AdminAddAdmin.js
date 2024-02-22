import "../CSS/ProfileAdmin.css"
import { useState } from "react";
import AdminService1 from "../service/AdminService1";
import { useEffect } from "react";
import axios from "axios";
import AuthenticationService from "../service/AuthenticationService";
function AdminAddAdmin(props) {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [adharNo, setAdharNo] = useState("");
    const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [education, setEducation] = useState("");
    const [category, setCategory] = useState("");
    const [shift, setShift] = useState("");
    const [role, setRole] = useState(sessionStorage.getItem('user_role'))
    const [loginFlag, setLoginFlag] = useState(AuthenticationService.isUserLoggedIn())

    const [defaultImg, setDefaultImg] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")
    const user = {
        firstName,
        lastName,
        email,
        password,
        phone,
        dob,
        adharNo,
        gender,
        bloodGroup,
        education,
        category,
        shift
    };


    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");

    const address = {
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pinCode

    };




    const [img, setImg] = useState([]);
    const json1 = JSON.stringify(user)
    const blob1 = new Blob([json1], {
        type: 'application/json'
    });

    const json2 = JSON.stringify(address)
    const blob2 = new Blob([json2], {
        type: 'application/json'
    });



    const addStaff = (event) => {
        event.preventDefault();
        console.log("user details: " + JSON.stringify(user));
        const formData = new FormData();

        console.log(img)
        formData.append('imgFile', img)
        formData.append('staffDto', blob1);
        formData.append('addressDto', blob2);

        AdminService1.registerStaff(formData).then((result) => { console.log("uaer details addede : " + result); })
            .catch((err) => { console.log("error massage is" + err) })
    };




    return (
        <div>

            <div className="container light-style flex-grow-1 container-p-y">
                <h4 className="font-weight-bold py-3 mb-4">
                    Staff Registration Form
                </h4>
                <div className="card overflow-hidden">
                    <div className="row no-gutters row-bordered row-border-light">
                        <div className="col-md-3 pt-0">
                            <div className="list-group list-group-flush account-settings-links">
                            </div>
                        </div>
                        <div className="main col-md-15">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="account-general">
                                    <div className="card-body media align-items-center">
                                        <div className="media-body ml-4">
                                            <div className="photo d-flex flex-row-reverse">
                                                <img src={defaultImg} alt="" className="d-block ui-w-80" />
                                            </div>
                                            <div className="reset d-flex flex-row-reverse">

                                                <label className="fw-bold">

                                                    <input className="form-control" type="file" onChange={(e) => { setImg(e.target.files[0]); setDefaultImg(URL.createObjectURL(e.target.files[0])) }} />

                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-light m-0" />
                                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <div className="row gutters gy-3">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <h6 className="mb-2 text-primary fw-bold">Personal Details</h6>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="fullName">First Name</label>
                                                            <input type="text" className="form-control" id="fullName" placeholder="Enter First name"
                                                                onChange={(event) => { setFirstName(event.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="eMail">Email</label>
                                                            <input type="email" className="form-control" id="eMail" placeholder="Enter email ID"
                                                                onChange={(event) => { setEmail(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="fullName">Last Name</label>
                                                            <input type="text" className="form-control" id="fullName1" placeholder="Enter Last name"
                                                                onChange={(event) => { setLastName(event.target.value) }} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label className="fw-bold" pass="phone">Password</label>
                                                            <input type="password" className="form-control" id="pass" placeholder="Enter Password"
                                                                onChange={(event) => { setPassword(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="phone">Phone</label>
                                                            <input type="text" className="form-control" id="phone" placeholder="Enter Phone No."
                                                                onChange={(event) => { setPhone(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="dob">Dob</label>
                                                            <input type="date" className="form-control" id="dob"
                                                                onChange={(event) => { setDob(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="adhaar">Adhaar No.</label>
                                                            <input type="text" className="form-control" id="adhaar" placeholder="Enter Adhaar No."
                                                                onChange={(event) => { setAdharNo(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label fw-bold">Blood Group</label><br />
                                                            <select className="custom-select" onChange={(event) => { setBloodGroup(event.target.value) }}>
                                                                <option>--Select--</option>
                                                                <option >O+</option>
                                                                <option>O-</option>
                                                                <option>A+</option>
                                                                <option>A-</option>
                                                                <option>B+</option>
                                                                <option>B+</option>
                                                                <option>AB+</option>
                                                                <option>AB-</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <p className="fw-bold">Gender</p>

                                                            <input type="radio" id="male" name="gender"
                                                                value="male" onChange={(event) => { setGender(event.target.value) }} />
                                                            <label for="male">Male</label>

                                                            <input type="radio" id="female" name="gender" style={{ marginLeft: "10px" }}
                                                                value="female" onChange={(event) => { setGender(event.target.value) }} />
                                                            <label for="female">Famale</label>

                                                            <input type="radio" id="other" name="gender" style={{ marginLeft: "10px" }}
                                                                value="other" onChange={(event) => { setGender(event.target.value) }} />
                                                            <label for="other">Other</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="form-label fw-bold">Education</label><br />
                                                            <select className="custom-select" onChange={(event) => { setEducation(event.target.value) }}>
                                                                <option>--Select--</option>
                                                                <option>HSC</option>
                                                                <option>GRADUATION</option>
                                                                <option>POST_GRADUATION</option>
                                                                <option>MBBS</option>
                                                                <option>MS</option>
                                                                <option>MD</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold form-label">Work Category</label><br />
                                                            <select className="custom-select" onChange={(event) => { setCategory(event.target.value) }}>
                                                                <option>--Select--</option>
                                                                <option>DOCTOR</option>
                                                                <option >NURSE</option>
                                                                <option>WARD_CLERK</option>
                                                                <option>ASSISTANT</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold form-label">Shift</label><br />
                                                            <select className="custom-select" onChange={(event) => { setShift(event.target.value) }}>
                                                                <option>--Select--</option>
                                                                <option>I</option>
                                                                <option>II</option>
                                                                <option>III</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row gutters gy-3">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <h6 className="mt-3 mb-2 text-primary fw-bold">Address</h6>
                                                    </div>

                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="adrLine1">Address Line 1</label>
                                                            <input type="name" className="form-control" id="adrLine1" placeholder="Address Line 1"
                                                                onChange={(event) => { setAddressLine1(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="adrLine2">Address Line 2</label>
                                                            <input type="name" className="form-control" id="adrLine2" placeholder="Address Line 2"
                                                                onChange={(event) => { setAddressLine2(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="city">City</label>
                                                            <input type="text" className="form-control" id="city" placeholder="Enter City"
                                                                onChange={(event) => { setCity(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="state">State</label>
                                                            <input type="text" className="form-control" id="state" placeholder="Enter State"
                                                                onChange={(event) => { setState(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="country">Country</label>
                                                            <input type="text" className="form-control" id="country" placeholder="Enter Country"
                                                                onChange={(event) => { setCountry(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                        <div className="form-group">
                                                            <label className="fw-bold" for="pin">Pin Code</label>
                                                            <input type="text" className="form-control" id="pin" placeholder="Pin Code"
                                                                onChange={(event) => { setPinCode(event.target.value) }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="submit text-right mt-3">
                                        <button type="button" className="btn btn-primary show" onClick={addStaff} >Submit</button>
                                        <button type="button" className="btn btn-default" href="*">Cancel</button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default AdminAddAdmin;