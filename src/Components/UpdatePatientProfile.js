import NavBar from "./NavBar"
import "../CSS/ProfileAdmin.css"
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import PatientService from "../service/PatientService";
import axios from "axios";
import ImageService from "../service/ImageService";
import { UserContext } from "./Contexts";
import swal from "sweetalert";
import PatientFirstPage from "./PatientFirstPage";
import ViewPatientProfile from "./ViewPatinetProfile";
function UpdatePatientProfile() {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const [newImg, setNewImg] = useState([])
    const [image, setImage] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")
    const { cmp, setCmp, user, SetUser } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [adharNo, setAdharNo] = useState("");
    const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    var id = sessionStorage.getItem('id')
    const [defaultImg, setDefaultImg] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")


    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");





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

        PatientService.getPatientDetails(id).then((result) => {
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
    const json1 = JSON.stringify(user1)
    const blob1 = new Blob([json1], {
        type: 'application/json'
    });

    const json2 = JSON.stringify(address)
    const blob2 = new Blob([json2], {
        type: 'application/json'
    });


    const addPatient = (event) => {
        event.preventDefault();
        const formData = new FormData();


        console.log(img)
        formData.append('imgFile', img)
        formData.append('patientDto', blob1);
        formData.append('addressDto', blob2);

        PatientService.updateDetails(formData, user.id).then((result) => {
            swal("Info", "Profile Update SuccessFully", "success")
            setCmp(<ViewPatientProfile />)
        })
            .catch((err) => {
                console.log("error massage is" + err)
                swal("Info", "Profile Update Failed", "error")
            })
    };
    const uploadImage = (e) => {
        const formData = new FormData();
        formData.append("imgFile", newImg)

        ImageService.uploadPatientImage(user.id, formData).then(
            (res) => {

                swal("Image Upload Info", "Images Upadted Successfully", "success")
            }
        ).catch(swal("Image Upload Info", "Images Upadted Failed", "error"));
    }

    const general = () => {
        setCmp(<PatientFirstPage />)
    }



    return (
        <div>

            <div className="container light-style flex-grow-1 container-p-y">

                <div className="card overflow-hidden">

                    <div className="row no-gutters row-bordered row-border-light">

                        <div className="card-body media align-items-center">
                            <div className="media-body ml-4">
                                <div className="photo d-flex flex-row-reverse">
                                    <img src={image} alt="" className="d-block ui-w-80" style={{ marginLeft: "1vh", width: "20vh", height: "15vh" }} />
                                </div>
                                <div className="reset d-flex flex-row-reverse">
                                    <button type="button" className="btn btn-default md-btn-flat" onClick={uploadImage}>Change</button>

                                    <label className="btn btn-outline-primary ">
                                        Upload new photo
                                        <input type="file" className="account-settings-fileinput" onChange={(e) => { setImage(URL.createObjectURL(e.target.files[0])); setNewImg(e.target.files[0]) }} />
                                    </label>

                                </div>
                            </div>

                        </div>
                        <hr className="border-light m-0" />
                        <div style={{ marginLeft: "12vh" }}>
                            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 ">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="row gutters gy-3">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 className="mb-2 text-primary">Personal Details</h6>
                                            </div>
                                            <div className="col-xl-6 col-lg-12 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="fullName">First Name</label>
                                                    <input type="text" className="form-control" id="fullName" placeholder="Enter First name"
                                                        value={firstName} onChange={(event) => { setFirstName(event.target.value) }} />
                                                </div>

                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="fullName">Last Name</label>
                                                    <input type="text" className="form-control" id="fullName1" placeholder="Enter Last name"
                                                        value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                                                </div>
                                                {/* <div className="htmlForm-group">
                                                            <label className='fw-bold' pass="phone">Password</label>
                                                            <input type="password" className="form-control" id="pass" placeholder="Enter Password"
                                                                onChange={(event) => { setPassword(event.target.value) }} />
                                                        </div> */}
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="phone">Phone</label>
                                                    <input type="text" className="form-control" id="phone" placeholder="Enter Phone No."
                                                        value={phone} onChange={(event) => { setPhone(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="dob">Dob</label>
                                                    <input type="date" className="form-control" id="dob"
                                                        value={dob} onChange={(event) => { setDob(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="adhaar">Adhaar No.</label>
                                                    <input type="text" className="form-control" id="adhaar" placeholder="Enter Adhaar No."
                                                        value={adharNo} onChange={(event) => { setAdharNo(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
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
                                                <div className="htmlForm-group">
                                                    <p>Gender</p>

                                                    <input type="radio" id="male" name="gender"
                                                        value="male" checked={gender === "male"} onChange={changeGender} />

                                                    <label className='fw-bold' htmlFor="male">Male</label>

                                                    <input type="radio" id="female" name="gender" style={{ marginLeft: "10px" }}
                                                        value="female" checked={gender === "female"} onChange={changeGender} />
                                                    <label className='fw-bold' htmlFor="female">Female</label>

                                                    <input type="radio" id="other" name="gender" style={{ marginLeft: "10px" }}
                                                        value="other" checked={gender === "other"} onChange={changeGender} />
                                                    <label className='fw-bold' htmlFor="other">Other</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row gutters gy-3">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                <h6 className="mt-3 mb-2 text-primary">Address</h6>
                                            </div>

                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="adrLine1">Address Line 1</label>
                                                    <input type="name" className="form-control" id="adrLine1" placeholder="Address Line 1"
                                                        value={addressLine1} onChange={(event) => { setAddressLine1(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="adrLine2">Address Line 2</label>
                                                    <input type="name" className="form-control" id="adrLine2" placeholder="Address Line 2"
                                                        value={addressLine2} onChange={(event) => { setAddressLine2(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="city">City</label>
                                                    <input type="text" className="form-control" id="city" placeholder="Enter City"
                                                        value={city} onChange={(event) => { setCity(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="state">State</label>
                                                    <input type="text" className="form-control" id="state" placeholder="Enter State"
                                                        value={state} onChange={(event) => { setState(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="country">Country</label>
                                                    <input type="text" className="form-control" id="country" placeholder="Enter Country"
                                                        value={country} onChange={(event) => { setCountry(event.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                <div className="htmlForm-group">
                                                    <label className='fw-bold' htmlFor="pin">Pin Code</label>
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
                <button type="button" className="btn btn-primary mydiv show" onClick={addPatient}>Submit</button>&nbsp;
                <button type="button" className="btn btn-secondary show" onClick={general}>Cancel</button>
            </div>
        </div>

    )
}

export default UpdatePatientProfile;
