import NavBar from "./NavBar"
import "../CSS/ProfileAdmin.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import PatientService from "../service/PatientService";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "./Contexts";
import UpdatePatientProfile from "./UpdatePatientProfile";
import ImageService from "../service/ImageService";
function ViewPatientProfile(props) {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const { cmp, setCmp, user, setUser, image, setImage, patient, setPatient } = useContext(UserContext)
    var id = sessionStorage.getItem('id')

    function editProfile() {
        setCmp(<UpdatePatientProfile />)
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
                                    <span> {patient.firstName}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="fullName">Last Name : </label>
                                    <span>  {patient.lastName}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="eMail">Email : </label>
                                    <span>  {patient.email}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="phone">Phone No : </label>
                                    <span>  {patient.phone}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="dob">Date of Birth : </label>
                                    <span>  {patient.dob}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Gender : </label>
                                    <span>  {patient.gender}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">BloodGroup : </label>
                                    <span>  {patient.bloodGroup}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Adhaar No : </label>
                                    <span>  {patient.adharNo}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Health Plan : </label>
                                    <span>  {patient.healthPlan}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adhaar">Health Plan Expiry Date : </label>
                                    <span>  {patient.healthPlanExpDate}</span>
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
                                    <span> {patient.addressLine1}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="adrLine2">Address Line 2 : </label>
                                    <span> {patient.addressLine2}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="city">City : </label>
                                    <span> {patient.city}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="state">State : </label>
                                    <span> {patient.state}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="country">Country : </label>
                                    <span> {patient.country}</span>
                                </div>
                            </div>
                            <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                <div className="form-group">
                                    <label className="heading" for="pin">Pin Code : </label>
                                    <span> {patient.pinCode}</span>
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

export default ViewPatientProfile;
