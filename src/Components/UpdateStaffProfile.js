import NavBar from "./NavBar"
import "../CSS/ProfileAdmin.css"
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import StaffService from "../service/StaffService";
import ImageService from "../service/ImageService";
import { UserContext } from "./Contexts";
import swal from "sweetalert";
import StaffFirstPage from "./StaffFirstPage";
import ViewPatientProfile from "./ViewPatinetProfile";
import ViewStaffProfile from "./ViewStaffProfile";
import axios from "axios";
function UpdateStaffProfile() {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [adharNo, setAdharNo] = useState("");
    const [gender, setGender] = useState("");
    const [newImg, setNewImg] = useState([])
    const [bloodGroup, setBloodGroup] = useState("");
    const { cmp, setCmp, user, SetUser } = useContext(UserContext);
    // const [defaultImg, setDefaultImg] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")
    const [image, setImage] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")
    const user1 = {
        firstName,
        lastName,
        email,
        phone,
        dob,
        adharNo,
        gender,
        bloodGroup
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






    useEffect(() => {


        async function getImage() {
            let imageBlob
            let promise
            try {

                promise = await ImageService.fetchStaffImage(user.id);
                imageBlob = promise.data

            } catch (err) {

                return "https://bootdey.com/img/Content/avatar/avatar1.png"
            }
            return URL.createObjectURL(imageBlob)
        }
        async function getImages() {
            setImage(await getImage())
        }
        getImages()

        StaffService.getStaffDetails(user.id).then((result) => {

            var details = result.data;
            setFirstName(details.user.firstName);
            setLastName(details.user.lastName);
            setEmail(details.user.email);
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


    function changeGender(e) {
        console.log("gender :" + e.target.value);
        setGender(e.target.value);
    }



    const [img, setImg] = useState([]);
    const json1 = JSON.stringify(user1)
    const blob1 = new Blob([json1], {
        type: 'application/json'
    });

    const json2 = JSON.stringify(address)
    const blob2 = new Blob([json2], {
        type: 'application/json'
    });


    const updateStaff = (event) => {
        event.preventDefault();
        console.log("user details: " + JSON.stringify(user1));
        const formData = new FormData();


        console.log("date of birth: " + dob)
        formData.append('imgFile', newImg)
        formData.append('staffDto', blob1);
        formData.append('addressDto', blob2);

        StaffService.updateDetails(formData, user.id).then((result) => {
            swal("Info", "Profile Update SuccessFully", "success")
            setCmp(<StaffFirstPage />)
        })
            .catch((err) => { console.log("error massage is" + err); swal("Info", "Profile Update Failed", "error") })
    };
    const uploadImage = (e) => {
        const formData = new FormData();
        formData.append("imgFile", newImg)

        ImageService.uploadStaffImage(user.id, formData).then(
            (res) => {

                swal("Image Upload Info", "Images Upadted Successfully", "success")
            }
        ).catch(swal("Image Upload Info", "Images Upadted Failed", "error"));
    }

    const general = () => {
        setCmp(<StaffFirstPage />)
    }


    return (
        <div>

            <div className="container light-style flex-grow-1 container-p-y">
                {/* <h4 className="font-weight-bold py-3 mb-4 display-6">
                    Profile
                </h4> */}
                <div className="card ">

                    <div className="row no-gutters row-bordered row-border-light">

                        <div className="card-body media align-items-center">
                            <div className="media-body ml-4">
                                <div className="photo d-flex flex-row-reverse">
                                    <img src={image} alt="" className="d-block ui-w-80" style={{ marginLeft: "1vh", width: "20vh", height: "15vh" }} />
                                </div>
                                <div className="reset d-flex flex-row-reverse">
                                    <button type="button" className="btn btn-default md-btn-flat show" onClick={uploadImage}>Change</button>

                                    <label className="btn btn-outline-primary show">
                                        Upload new photo
                                        <input type="file" className="account-settings-fileinput" onChange={(e) => { setImage(URL.createObjectURL(e.target.files[0])); setNewImg(e.target.files[0]) }} />
                                    </label>

                                </div>
                            </div>
                        </div>
                        <hr className="border-light m-0" />
                        <div style={{ marginLeft: "12vh" }}>
                            <div className="col-xl-10   col-12 ">
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
                                                        value={firstName} onChange={(event) => { setFirstName(event.target.value) }} />
                                                </div>
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
                                                        value={lastName} onChange={(event) => { setLastName(event.target.value) }} />
                                                </div>
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
                                                        value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="dob">Dob</label>
                                                    <input type="date" className="form-control" id="dob"
                                                        value={dob} onChange={(event) => { setDob(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="adhaar">Adhaar No.</label>
                                                    <input type="text" className="form-control" id="adhaar" placeholder="Enter Adhaar No."
                                                        value={adharNo} onChange={(event) => { setAdharNo(event.target.value) }} />
                                                </div>
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
                                                        value={addressLine1} onChange={(event) => { setAddressLine1(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="adrLine2">Address Line 2</label>
                                                    <input type="name" className="form-control" id="adrLine2" placeholder="Address Line 2"
                                                        value={addressLine2} onChange={(event) => { setAddressLine2(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="city">City</label>
                                                    <input type="text" className="form-control" id="city" placeholder="Enter City"
                                                        value={city} onChange={(event) => { setCity(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="state">State</label>
                                                    <input type="text" className="form-control" id="state" placeholder="Enter State"
                                                        value={state} onChange={(event) => { setState(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="country">Country</label>
                                                    <input type="text" className="form-control" id="country" placeholder="Enter Country"
                                                        value={country} onChange={(event) => { setCountry(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="form-group">
                                                    <label htmlFor="pin">Pin Code</label>
                                                    <input type="text" className="form-control" id="pin" placeholder="Pin Code"
                                                        value={pinCode} onChange={(event) => { setPinCode(event.target.value) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-right mt-3">
                <button type="button" className="btn btn-primary mydiv show" onClick={updateStaff}>Submit</button>&nbsp;
                <button type="button" className="btn btn-secondary show" onClick={general}>Cancel</button>
            </div>
        </div>

    )
}

export default UpdateStaffProfile;
