import NavBar from "./NavBar"
import "../CSS/ProfileStaff.css"
import AuthenticationService from "../service/AuthenticationService";
import StaffFirstPage from "./StaffFirstPage";
import UpdateStaffProfile from "./UpdateStaffProfile";
import StaffChangePassword from "./StaffChangePassword";
import ShowAppointment from "./ShowAppointments";
import UploadReports from "./UploadReports";
import ImageService from "../service/ImageService";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { UserContext } from "./Contexts"
import ViewStaffProfile from "./ViewStaffProfile";
import BloodDonorList from "./BloodDonorList";
import SearchAppointmentByPatientName from "./SearchAppointmentByPatientName";
import '../CSS/sidebar.css'


function StaffProfile(props) {
    if (!AuthenticationService.isUserLoggedIn())
        props.history.push("/login")
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const [cmp, setCmp] = useState(<StaffFirstPage />)
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [userRole, setUserRole] = useState()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [adharNo, setAdharNo] = useState("");
    const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");

    const [role, setRole] = useState(sessionStorage.getItem('user_role'))
    var logout = () => {
        AuthenticationService.removeUserDetails();
        swal("Logout Info", "Logout Successfull!!", "success")
        props.history.push("/")
    }


    return (
        <div>
            {role === 'ROLE_STAFF' ? (
                <UserContext.Provider value={{ cmp, setCmp, user, setUser }}>
                    <div className="container-fluid" style={{ marginTop: "3vh" }}>
                        <div className="row">
                            <div className="col-2">
                                <h2 style={{ color: "#2389AD" }}>Your Account</h2>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<StaffFirstPage />) }}>General</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(< ViewStaffProfile />) }}>View Profile</a></h6>

                                {/* <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<UpdateStaffProfile />) }}>Update Profile</a></h6> */}
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<StaffChangePassword />) }}>Change Password</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<ShowAppointment />) }}>Show All Appintments</a></h6>

                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<SearchAppointmentByPatientName />) }}>Search Appointment</a></h6>

                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<UploadReports />) }}>Upload Reports</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<BloodDonorList />) }}>Generate Request For Blood Donor</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={logout}>Logout</a></h6>

                            </div>

                            <div className="col">
                                {cmp}
                            </div>

                        </div>

                    </div>
                </UserContext.Provider>) :
                (props.history.push("/login"))}
        </div>
    )
}

export default StaffProfile;