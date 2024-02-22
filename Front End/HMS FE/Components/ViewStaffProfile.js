import NavBar from "./NavBar"
import "../CSS/ProfileAdmin.css"
import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from "react";
import PatientService from "../service/PatientService";
import StaffService from "../service/StaffService";
import { UserContext } from "./Contexts";
import UpdateStaffProfile from "./UpdateStaffProfile";
import ImageService from "../service/ImageService";
import axios from "axios";
function ViewStaffProfile(props) {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [adharNo, setAdharNo] = useState("");
    const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [education, setEducation] = useState("");
    const [category, setCategory] = useState("");
    const [shift, setShift] = useState("");
    const { cmp, setCmp, user, SetUser } = useContext(UserContext);
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [image, setImage] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")


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
            setEducation(details.user.education);
            setCategory(details.user.category);
            setShift(details.user.shift);

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


    function editProfile() {
        setCmp(<UpdateStaffProfile />)
    }


    return (
        <div>
            <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                    <div className="card-body">
                        <div className="row gutters">
                            <div className="card-body media align-items-center" style={{ marginLeft: "70vh" }}>
                                <div className="media-body ml-4">
                                    <div className="photo d-flex flex-row-reverse">
                                        <img src={image} alt="" className="d-block ui-w-80" style={{ marginLeft: "1vh", width: "20vh", height: "15vh" }} />
                                    </div>

                                </div>
                            </div>
                            <div className="info col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 className="heading mb-2 text-primary">Personal Details</h6>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="fullName">First Name : </label>
                                    <span> {firstName}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="fullName">Last Name : </label>
                                    <span>  {lastName}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="eMail">Email : </label>
                                    <span>  {email}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="phone">Phone No : </label>
                                    <span>  {phone}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="dob">Date of Birth : </label>
                                    <span>  {dob}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Gender : </label>
                                    <span>  {gender}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">BloodGroup : </label>
                                    <span>  {bloodGroup}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Adhaar No : </label>
                                    <span>  {adharNo}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Education : </label>
                                    <span>  {education}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Category : </label>
                                    <span>  {category}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Shift : </label>
                                    <span>  {shift}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row gutters">
                            <div className="info heading col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 className="heading mt-3 mb-2 text-primary">Address</h6>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adrLine1">Address Line 1 : </label>
                                    <span> {addressLine1}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adrLine2">Address Line 2 : </label>
                                    <span> {addressLine2}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="city">City : </label>
                                    <span> {city}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="state">State : </label>
                                    <span> {state}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="country">Country : </label>
                                    <span> {country}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="pin">Pin Code : </label>
                                    <span> {pinCode}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-right mt-3">
                    <button type="button" className="btn btn-primary show" onClick={editProfile} >Edit Profile</button>&nbsp;
                </div>
            </div>
        </div>

    )
}

export default ViewStaffProfile;
