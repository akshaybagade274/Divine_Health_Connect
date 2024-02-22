import "../CSS/ProfileStaff.css";
import { useEffect } from "react";
import "../CSS/ProfileStaff.css";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useContext } from "react";
import { UserContext } from "./Contexts";
import StaffFirstPage from "./StaffFirstPage"
import StaffService from "../service/StaffService";
function StaffChangePassword(props) {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const { cmp, setCmp, user, SetUser } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    var admin = useContext(UserContext);
    const [id, setId] = useState()
    useEffect(() => {
        setId(admin.id)
    }, [])

    const passwordDto = {
        password
    }
    function changePassword() {

        if (password === rePassword) {
            console.log(id)
            StaffService.changePassword(user.id, passwordDto).then(() => {
                swal("Info", "Password changed", "success")
                setCmp(<StaffFirstPage />)
            }).catch((error) => {
                swal("Error", "Password Not Changed", "error")
            })
        } else {
            document.getElementById("myDiv").innerHTML = "Password Missmatch"
        }


    }
    const reload = () => {
        setCmp(<StaffFirstPage />)
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

                            <div className="form-group">
                                <label className="form-label  fw-bold">Repeat new password</label>
                                <input type="password" className="form-control" onChange={(e) => { setRePassword(e.target.value) }} />
                                <div id="myDiv" style={{ color: "red" }}></div>
                            </div>
                        </div>
                        <div className="text-right mt-3">
                            <button type="button" className="btn btn-primary show" onClick={changePassword} >Submit</button>&nbsp;
                            <button type="button" className="btn btn-default show" onClick={reload}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffChangePassword;