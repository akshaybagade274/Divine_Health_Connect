
import "../CSS/ProfilePatient.css";
import React, { useEffect } from "react";

import { useState } from "react";
import StaffService from "../service/StaffService";
import swal from "sweetalert";
import { useContext } from "react";
import { UserContext } from "./Contexts";
import PatientFirstPage from "./PatientFirstPage";
import PatientService from "../service/PatientService";
import axios from "axios";
function PatientChangePassword(props) {
    const { cmp, setCmp, user, SetUser } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const passwordDto = {
        password
    }
    function changePassword() {

        if (password === rePassword) {
            console.log(user.id)

            PatientService.changePassword(user.id, passwordDto).then(() => {
                swal("Info", "Password changed", "success")
                setCmp(<PatientFirstPage />)
            }).catch((error) => {
                swal("Error", "Password Not Changed", "error")
            })
        } else {
            document.getElementById("myDiv").innerHTML = "Password Missmatch"
        }


    }
    const reload = () => {
        setCmp(<PatientFirstPage />)
    }


    return (

        <div>
            <div className="container">
                <div className="row">
                    <div className="col4">
                        <div className=" pb-2">
                            <div className="form-group">
                                <label className="form-label fw-bold">New password</label>
                                <input type="password" className="form-control" onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div style={{ marginBottom: '2vh', color: 'grey' }}>Note*:New Password must be 8-15 char long and must contain - atleast 1 upper case,1 lower case letter, 1 digit and 1 special character (@$!%#*?&)</div>

                            <div className="form-group fw-bold">
                                <label className="form-label">Repeat new password</label>
                                <input type="password" className="form-control" onChange={(e) => { setRePassword(e.target.value) }} />
                                <div id="myDiv" style={{ color: "red" }}></div>
                            </div>
                        </div>
                        <div className="text-right mt-3">
                            <button type="button" className="btn btn-primary show " onClick={changePassword} >Submit</button>&nbsp;
                            <button type="button" className="btn btn-secondary show" onClick={reload}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PatientChangePassword;