import "../CSS/ProfilePatient.css"
import { useContext } from "react";
import { UserContext } from "./Contexts";
import ImageService from "../service/ImageService";
import { useEffect, useState } from "react";
import ViewPatientProfile from "./ViewPatinetProfile";
import ProfilePatient from "./ProfilePatient";
import axios from "axios";
function PatientFirstPage(props) {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const { cmp, setCmp, user, setUser, image, setImage, patient, setPatient } = useContext(UserContext)
    const id = sessionStorage.getItem('id')
    //  const [image, setImage] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")
    const [newImg, setNewImg] = useState([])
    const formData = new FormData();


    // const patient = patient;
    useEffect(() => {

    }, [])

    console.log(patient)

    return (

        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
                <div className="card-body">
                    <div className="row gutters">
                        <div className="card-body media alian>gn-items-center" style={{ marginLeft: "70vh" }}>

                            <img src={image} alt="https://bootdey.com/img/Content/avatar/avatar1.png" className="img-fluid rounded border shadow" style={{ marginLeft: "18vh", width: "20vh", height: "15vh" }} />


                            <br />




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
                                <label className="heading" for="phone">Phone No.</label>
                                <span>  {patient.phone}</span>
                            </div>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading" for="dob">Dob</label>
                                <span>  {patient.dob}</span>
                            </div>
                        </div>

                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading form-label">Blood Group</label>
                                <span>  {patient.bloodGroup}</span>
                            </div>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading form-label">Health Plan : </label>
                                <span>  {patient.healthPlan}</span>
                            </div>
                        </div>
                        <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                            <div className="form-group">
                                <label className="heading form-label">Expiry Date : </label>
                                <span> {patient.healthPlanExpDate}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PatientFirstPage;