import NavBar from "./NavBar"
import "../CSS/ProfileAdmin.css"
import ImageService from "../service/ImageService";
import { useEffect, useState } from "react";
import UpdateAdminProfile from "./UpdateAdminProfile"
import AdminChangePassword from "./AdminChangePassword";
import AdminAddAdmin from "./AdminAddAdmin";
import AdminFirstPage from "./AdminFirstPage";
import AdminAddStaff from "./AdminAddStaff";
import AuthenticationService from "../service/AuthenticationService";
import axios from "axios";
import swal from "sweetalert";
import { UserContext } from "./Contexts"
import Schedule from "./Schedule";
import ViewApplication from "./ViewApplication";


function AdminProfile(props) {
    if (!AuthenticationService.isUserLoggedIn())
        props.history.push("/login")

    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')

    const [cmp, setCmp] = useState(<AdminFirstPage />)
    const [image, setImage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
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
    const [id, setId] = sessionStorage.getItem('id')
    const [role, setRole] = useState(sessionStorage.getItem('user_role'))

    var logout = () => {
        AuthenticationService.removeUserDetails();
        swal("Logout Info", "Logout Successfull!!", "success")
        props.history.push("/")
    }

    useEffect(() => {
        async function getImage() {
            let imageBlob
            let promise
            try {
                // imageBlob = (await axios.get(`/patient/${id}/image`, { responseType: 'blob' })).data
                promise = await ImageService.fetchUserImage(id);
                imageBlob = promise.data

            } catch (err) {

                return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            return URL.createObjectURL(imageBlob)
        }
        async function getImages() {
            setImage(await getImage())
        }
        setUserRole(sessionStorage.getItem('user_role'));

        getImages()

        setFirstName(JSON.parse(sessionStorage.getItem('user')).firstName)
        setLastName(JSON.parse(sessionStorage.getItem('user')).lastName)
        setUserRole(JSON.parse(sessionStorage.getItem('user')).role)
        setAdharNo(JSON.parse(sessionStorage.getItem('user')).adharNo)
        setDob(JSON.parse(sessionStorage.getItem('user')).dob)
        setEmail(JSON.parse(sessionStorage.getItem('user')).email)
        setPhone(JSON.parse(sessionStorage.getItem('user')).phone)


    }, [])

    const user = {
        id,
        firstName,
        lastName,
        email,
        phone,
        dob,
        adharNo
        // gender,
        //bloodGroup
    }
    const updateState = () => {
        setCmp(<AdminFirstPage />)
        window.location.reload();
    }

    return (
        <div>
            {role === 'ROLE_ADMIN' ? (
                <UserContext.Provider value={user}>
                    <div className="container-fluid" style={{ marginTop: "3vh" }}>
                        <div className="row">
                            <div className="col-2">
                                <h2 style={{ color: "#2389AD" }}>Your Profile</h2>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<AdminFirstPage />) }}>General</a></h6>
                                {/* <h4 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<UpdateAdminProfile />) }}>Update Profile</a></h4> */}
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<AdminAddStaff update={updateState} />) }}>Add Staff</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<Schedule />) }}>Schedule Manager</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<ViewApplication />) }}>View Job Applications</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={() => { setCmp(<AdminChangePassword update={updateState} />) }}>Change Password</a></h6>
                                <h6 style={{ color: "#2593BA" }} ><a className="nav-link" href="#" onClick={logout}>Logout</a></h6>

                            </div>

                            <div className="col">

                                {cmp}
                            </div>
                        </div>
                    </div>
                </UserContext.Provider>)
                : (props.history.push('/login'))}
        </div>
    )
}

export default AdminProfile;