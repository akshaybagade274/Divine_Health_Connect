
import "../CSS/Profile.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import UserService from "../service/UserService";
import axios from "axios";
import Validation from './Validation'


function UpdateProfile() {
    if (localStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + localStorage.getItem('jwt')

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [adharNo, setAdharNo] = useState("");
    const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    var id = JSON.parse(localStorage.getItem('user')).id
    const [defaultImg, setDefaultImg] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")


    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");

    const [firstNameFlag, setFirstNameFlag] = useState(false);
    const [lastNameFlag, setLastNameFlag] = useState(false);
    const [adr1Flag, setAdr1Flag] = useState(false);
    const [adr2Flag, setAdr2Flag] = useState(false);
    const [cityFlag, setCityFlag] = useState(false);
    const [stateFlag, setStateFlag] = useState(false);
    const [countryFlag, setCountryFlag] = useState(false);





    useEffect(() => {
        UserService.getUserDetails(id).then((result) => {
            var details = result.data;
            setFirstName(details.user.firstName);
            setLastName(details.user.lastName);
            setEmail(details.user.email);
            // setPassword(details.user.password);
            setPhone(details.user.phone);
            setDob(details.user.dob);
            setAdharNo(details.user.adharNo);
            setGender(details.user.gender);
            setBloodGroup(details.user.bloodGroup);
            setAddressLine1(details.addressLine1);
            setAddressLine2(details.addressLine2);
            setCity(details.city);
            setCountry(details.country);
            setState(details.state);
            setPinCode(details.pinCode);

        }).catch((error) => {
            console.log("error in get details method : " + error);
        })

    }, []);

    const user = {
        firstName,
        lastName,
        email,
        phone,
        dob,
        adharNo,
        gender,
        bloodGroup
    };

    const address = {
        addressLine1,
        addressLine2,
        city,
        state,
        country,
        pinCode

    };
    function changeGender(e) {
        console.log("gender :" + e.target.value);
        setGender(e.target.value);
    }



    const [img, setImg] = useState([]);
    const json1 = JSON.stringify(user)
    const blob1 = new Blob([json1], {
        type: 'application/json'
    });

    const json2 = JSON.stringify(address)
    const blob2 = new Blob([json2], {
        type: 'application/json'
    });


    const addPatient = (event) => {
        event.preventDefault();
        console.log("user details: " + JSON.stringify(user));
        const formData = new FormData();


        console.log(img)
        formData.append('imgFile', img)
        formData.append('patientDto', blob1);
        formData.append('addressDto', blob2);

        UserService.updateDetails(formData, 8).then((result) => { console.log("uaer details addede : " + result); })
            .catch((err) => { console.log("error massage is" + err) })
    };



    return (
        <div>

            <div className="container light-style flex-grow-1 container-p-y">
                <h4 className="font-weight-bold py-3 mb-4">
                    Your Account
                </h4>
                <div className="card overflow-hidden">

                    <div className="row no-gutters row-bordered row-border-light">


                        <hr className="border-light m-0" />
                        <div className="main col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 mydiv">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row gutters gy-3">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mb-2 text-primary">Personal Details</h6>
                                        </div>
                                        <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="fullName">First Name</label>
                                                <input type="text" className="form-control" id="fullName" placeholder="Enter First name"
                                                    // value={firstName} 
                                                    onBlur={(event) => { setFirstName(event.target.value); setFirstNameFlag(true) }} />
                                            </div>
                                            {firstNameFlag && firstName.length == 0 && <div style={{ color: "red" }}><i class="bi bi-x-lg"></i> First name should not be empty</div>}

                                            {/* <div className="form-group">
                                                            <label htmlFor="eMail">Email</label>
                                                            <input type="email" className="form-control" id="eMail" placeholder="Enter email ID"
                                                                onChange={(event) => { setEmail(event.target.value) }} />
                                                        </div> */}
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="fullName">Last Name</label>
                                                <input type="text" className="form-control" id="fullName1" placeholder="Enter Last name"
                                                    // value={lastName}
                                                    onBlur={(event) => { setLastName(event.target.value); setLastNameFlag(true) }} />
                                            </div>
                                            {lastNameFlag && lastName.length == 0 && <div style={{ color: "red" }}><i class="bi bi-x-lg"></i> Last name should not be empty</div>}

                                            {/* <div className="form-group">
                                                            <label pass="phone">Password</label>
                                                            <input type="password" className="form-control" id="pass" placeholder="Enter Password"
                                                                onChange={(event) => { setPassword(event.target.value) }} />
                                                        </div> */}
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <input type="text" className="form-control" id="phone" placeholder="Enter Phone No."
                                                    //  value={phone} 
                                                    onBlur={Validation.validate_phone}
                                                    onChange={(event) => { setPhone(event.target.value) }} />
                                            </div>
                                            <div class="msg" id="phone_msg"></div>

                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="dob">Dob</label>
                                                <input type="date" className="form-control" id="dob"
                                                    //value={dob}
                                                    onChange={(event) => { setDob(event.target.value) }} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="adhaar">Adhaar No.</label>
                                                <input type="text" className="form-control" id="adhaar" placeholder="Enter Adhaar No."
                                                    // value={adharNo} 
                                                    onBlur={Validation.validate_adhar}

                                                    onChange={(event) => { setAdharNo(event.target.value) }} />
                                            </div>
                                            <div class="msg" id="adhar_msg"></div>

                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label className="htmlForm-label">Blood Group</label>
                                                <select className="custom-select" value={bloodGroup} onChange={(event) => { setBloodGroup(event.target.value) }}>
                                                    <option>O+</option>
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
                                                <p>Gender</p>

                                                <input type="radio" id="male" name="gender"
                                                    value="male" checked={gender === "male"} onChange={changeGender} />

                                                <label htmlFor="male">Male</label>

                                                <input type="radio" id="female" name="gender" style={{ marginLeft: "10px" }}
                                                    value="female" checked={gender === "female"} onChange={changeGender} />
                                                <label htmlFor="female">Female</label>

                                                <input type="radio" id="other" name="gender" style={{ marginLeft: "10px" }}
                                                    value="other" checked={gender === "other"} onChange={changeGender} />
                                                <label htmlFor="other">Other</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gutters gy-3">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mt-3 mb-2 text-primary">Address</h6>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="adrLine1">Address Line 1</label>
                                                <input type="name" className="form-control" id="adrLine1" placeholder="Address Line 1"
                                                    // value={addressLine1} 
                                                    onBlur={(event) => { setAddressLine1(event.target.value); setAdr1Flag(true) }} />
                                            </div>
                                            {adr1Flag && addressLine1.length == 0 && <div style={{ color: "red" }}><i class="bi bi-x-lg"></i> Address line 1 should not be empty</div>}

                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="adrLine2">Address Line 2</label>
                                                <input type="name" className="form-control" id="adrLine2" placeholder="Address Line 2"
                                                    // value={addressLine2} 
                                                    onBlur={(event) => { setAddressLine2(event.target.value); setAdr2Flag(true) }} />
                                            </div>
                                            {adr2Flag && addressLine2.length == 0 && <div style={{ color: "red" }}><i class="bi bi-x-lg"></i> Address line 2 should not be empty</div>}

                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="city">City</label>
                                                <input type="text" className="form-control" id="city" placeholder="Enter City"
                                                    // value={city} 
                                                    onBlur={(event) => { setCity(event.target.value); setCityFlag(true) }} />
                                            </div>
                                            {cityFlag && city.length == 0 && <div style={{ color: "red" }}><i class="bi bi-x-lg"></i> City name should not be empty</div>}

                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="state">State</label>
                                                <input type="text" className="form-control" id="state" placeholder="Enter State"
                                                    //value={state} 
                                                    onBlur={(event) => { setState(event.target.value); setStateFlag(true) }} />
                                            </div>
                                            {stateFlag && state.length == 0 && <div style={{ color: "red" }}><i class="bi bi-x-lg"></i> State name should not be empty</div>}

                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="country">Country</label>
                                                <input type="text" className="form-control" id="country" placeholder="Enter Country"
                                                    //value={country}
                                                    onBlur={(event) => { setCountry(event.target.value); setCountryFlag(true) }} />
                                            </div>
                                            {countryFlag && country.length == 0 && <div style={{ color: "red" }}><i class="bi bi-x-lg"></i> Country name should not be empty</div>}

                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="pin">Pin Code</label>
                                                <input type="text" className="form-control" id="pin" placeholder="Pin Code"
                                                    //value={pinCode} 
                                                    onBlur={Validation.validate_pincode}

                                                    onChange={(event) => { setPinCode(event.target.value) }} />
                                            </div>
                                            <div class="msg" id="pincode_msg"></div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right mt-3">
                <button type="button" className="btn btn-primary mydiv show" onClick={addPatient}>Submit</button>&nbsp;
                <button type="button" className="btn btn-default " href="*">Cancel</button>
            </div>
        </div>

    )
}

export default UpdateProfile;
