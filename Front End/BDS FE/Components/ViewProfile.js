import "../CSS/Profile.css"
import { useEffect, useState } from "react";
import AuthenticationService from "../service/AuthenticationService";
import UserService from "../service/UserService";
import swal from "sweetalert";
function ViewProfile(props) {

    //  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('user')));
    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [adharNo, setAdharNo] = useState("");
    // const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [status, setStatus] = useState("");

    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");

    var reqEmail = localStorage.getItem('email');

    var details
    useEffect(() => {
        // console.log("view email from " + localStorage.getItem('email'));

        UserService.getUserDetails(reqEmail)
            .then((response) => {
                // 
                // async function set() {

                console.log("deatils from back end : " + JSON.stringify(response.data))
                var details2 = JSON.stringify(response.data)
                details = JSON.parse(details2)
                // set(JSON.parse(details2));
                set();
                console.log("In Login addressLine1:  " + details.addressLine1)
                console.log("In Login addressLine1:  " + details.user.firstName)



                //   }

                // async function log() {
                //     await set()
                //     console.log(firstName)
                // }

                // log()

            })
            .catch(error => {
                console.log(error)
            });

    }, [])

    function set() {
        setId(details.user.id)
        setFirstName(details.user.firstName);
        setLastName(details.user.lastName);
        setEmail(details.user.email);
        // setPassword(details.user.password);
        setPhone(details.user.phone);
        setDob(details.user.dob);
        setAdharNo(details.user.adharNo);
        //  setGender(details.user.gender);
        setBloodGroup(details.user.bloodGroup);
        setStatus(details.user.status);


        setAddressLine1(details.addressLine1);
        setAddressLine2(details.addressLine2);
        setCity(details.city);
        setCountry(details.country);
        setState(details.state);
        setPinCode(details.pinCode);
    }

    const deleteUser = () => {
        UserService.deleteUser(id).then(() => {
            swal("Info", "Account Deleted", "Success");
            props.history.push("/");
        })
    }

    const logout = () => {
        AuthenticationService.removeUserDetails();
        props.history.push("/");
    }


    return (
        <div className="container light-style flex-grow-1 container-p-y">
            <h4 className="font-weight-bold py-3 mb-4">
                Profile
            </h4>
            <div className="card overflow-hidden">
                <div className="no-gutters row-bordered row-border-light">
                    <div className="pt-0">
                        <div className="list-group list-group-flush account-settings-links">

                        </div>
                    </div>

                    <div className="col main col-md-15" >
                        <div className="tab-content">
                            <div className="tab-pane fade active show" id="account-general">
                                <div className="card-body media align-items-center">

                                </div>
                                <hr className="border-light m-0" />
                                <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <div className="row gutters">
                                                <div className="info col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h6 className="heading mb-2 text-primary">Personal Details</h6>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="fullName" >First Name : </label>
                                                        <span>{firstName}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="fullName">Last Name : </label>
                                                        <span>  {lastName}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="eMail">Email : </label>
                                                        <span>  {email}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="phone">Phone No. : </label>
                                                        <span>  {phone}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="dob">Dob : </label>
                                                        <span>  {dob}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="adhaar">Adhaar No. : </label>
                                                        <span>  {adharNo}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading form-label my-class">Blood Group : </label>
                                                        <span>  {bloodGroup}</span>
                                                    </div>
                                                </div>

                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading form-label my-class">State : </label>
                                                        <span>  {status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row gutters">
                                                <div className="info heading col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                    <h6 className="heading mt-3 mb-2 text-primary">Address : </h6>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="adrLine1">Address Line 1 : </label>
                                                        <span> {addressLine1}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="adrLine2">Address Line 2 : </label>
                                                        <span> {addressLine2}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="city">City : </label>
                                                        <span> {city}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="state">State : </label>
                                                        <span> {state}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="country">Country : </label>
                                                        <span> {country}</span>
                                                    </div>
                                                </div>
                                                <div className="info col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                                    <div className="form-group">
                                                        <label className="heading my-class" for="pin">Pin Code : </label>
                                                        <span> {pinCode}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="edit text-right mt-3">
                        {/* <button type="button" className=" btn btn-primary show" onClick={logout}>Edit Profile</button> */}
                        {/* <button type="button" className=" btn btn-primary show" onClick={logout} >Change Password </button> */}
                        <button type="button" className=" btn btn-primary show" onClick={deleteUser} >Delete Account</button>
                        <button type="button" className=" btn btn-primary show" onClick={logout} >Logout</button>
                    </div>
                </div>

            </div>



        </div>


    )
}

export default ViewProfile;