import NavBar from "./NavBar"
import "../CSS/ProfilePatient.css"
import { useEffect, useState } from "react";
import UpdatePatientProfile from "./UpdatePatientProfile";
import PatientFirstPage from "./PatientFirstPage";
import PatientChangePassword from "./PatientChangePassword";
import ViewPatientProfile from "./ViewPatinetProfile";
import BookAppointment from "./BookAppointment";
import HealthPlans from "./HealthPlans";

import DownloadReport from "./DownloadReport";
import { UserContext } from "./Contexts"
import swal from "sweetalert";
import AuthenticationService from "../service/AuthenticationService";
import ImageService from "../service/ImageService";
import PatientService from "../service/PatientService";
import axios from "axios";

function ProfilePatient(props) {
    if (!AuthenticationService.isUserLoggedIn())
        props.history.push("/login")

    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const [cmp, setCmp] = useState()
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
    const [newImg, setNewImg] = useState([])
    const id = JSON.parse(sessionStorage.getItem('user')).id
    const [image, setImage] = useState("https://bootdey.com/img/Content/avatar/avatar1.png")

    const [patient, setPatient] = useState({})
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [adharNo, setAdharNo] = useState("");
    const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [healthPlan, setHealthPlan] = useState("No Active Plan");
    const [healthPlanExpDate, setHealthPlanExpDate] = useState("");

    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");

    const [role, setRole] = useState(sessionStorage.getItem('user_role'))

    useEffect(() => {
        async function getImage() {

            let imageBlob
            let promise
            try {
                // imageBlob = (await axios.get(`/patient/${id}/image`, { responseType: 'blob' })).data
                promise = await ImageService.fetchUserImage(id);
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

        async function getDetails() {
            let promise

            try {
                promise = await PatientService.getPatientDetails(id)
                var details = promise.data;
                console.log(promise.data)
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

                if (details.user.healthPlan !== null) {
                    setHealthPlan(details.user.healthPlan);
                    setHealthPlanExpDate(details.user.planExpiryDate);
                }

                setPatient({
                    firstName,
                    lastName,
                    email,
                    phone,
                    dob,
                    gender,
                    bloodGroup,
                    adharNo,
                    healthPlan,
                    healthPlanExpDate,

                    addressLine1,
                    addressLine2,
                    pinCode,
                    city,
                    state,
                    country
                })


            }
            catch (err) {
                console.log(err)
                swal("Error", "Something went Wrong", "error")
            }

        }

        async function set() {
            await getDetails()
            setCmp(<PatientFirstPage />)
        }

        set()
        setRole(sessionStorage.getItem('user_role'))



    }, [])


    useEffect(() => {
        async function getImage() {

            let imageBlob
            let promise
            try {
                // imageBlob = (await axios.get(`/patient/${id}/image`, { responseType: 'blob' })).data
                promise = await ImageService.fetchUserImage(id);
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

        async function getDetails() {
            let promise

            try {
                promise = await PatientService.getPatientDetails(id)
                var details = promise.data;
                console.log(promise.data)
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

                if (details.user.healthPlan !== null) {
                    setHealthPlan(details.user.healthPlan);
                    setHealthPlanExpDate(details.user.planExpiryDate);
                }

                setPatient({
                    firstName,
                    lastName,
                    email,
                    phone,
                    dob,
                    gender,
                    bloodGroup,
                    adharNo,
                    healthPlan,
                    healthPlanExpDate,

                    addressLine1,
                    addressLine2,
                    pinCode,
                    city,
                    state,
                    country
                })


            }
            catch (err) {
                console.log(err)
                swal("Error", "Something went Wrong", "error")
            }

        }

        async function set() {
            await getDetails()

        }

        set()


    }, [cmp])



    var logout = () => {
        AuthenticationService.removeUserDetails();
        swal("Logout Info", "Logout Successfull!!", "success")
        props.history.push("/")
    }

    console.log(user)

    return (
        <div>
            {role === 'ROLE_PATIENT' ? (
                <UserContext.Provider value={{ cmp, setCmp, user, image, setImage, patient, setPatient }}>
                    <div className="container-fluid" style={{ marginTop: "3vh" }}>
                        <div className="row">
                            <div className="col-2">
                                <h2 style={{ color: "#2389AD" }}>Your Account</h2>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<PatientFirstPage />) }}>General</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<ViewPatientProfile />) }}>View Profile</a></h6>
                                {/* <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<UpdatePatientProfile />) }}>Update Profile</a></h6> */}
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<PatientChangePassword />) }}>Change Password</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<BookAppointment />) }}>Book Appointment</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<HealthPlans data={setCmp} />) }}>Annual Healthplans</a></h6>

                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<DownloadReport />) }}>Download Reports</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={logout}>Logout</a></h6>

                            </div>

                            <div className="col">

                                {cmp}
                            </div>
                        </div>
                    </div>
                </UserContext.Provider>)
                : (props.history.push("/login"))}
        </div>
    )
}

export default ProfilePatient;