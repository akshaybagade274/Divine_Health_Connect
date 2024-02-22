import React from 'react'
import "../CSS/HealthPlan.css"
import AuthenticationService from '../service/AuthenticationService'
import NavBar from './NavBar'
import { useContext } from "react";
import { UserContext } from "./Contexts";
import { useEffect, useState } from "react";
import Payment from './Payment';

export default function HealthPlans(props) {

    const [flaglogin, setLoginFlag] = useState(false)
    const [plan, setPlan] = useState()

    useEffect(() => {
        if (AuthenticationService.isUserLoggedIn())
            setLoginFlag(true)
    }, [])

    useEffect(() => {
        subscribe()
    }, [plan])


    function subscribe() {

        console.log("Subscribe event " + plan)
        if (flaglogin) {
            //data=setCmp
            props.data(<Payment data={plan} setCmp={props.data} />)
        }


    }

    function loginPage() {
        props.history.push("/login")
    }

    return (
        <div>
            {!flaglogin && <NavBar />}
            <div>
                <div className="body container-fluid">
                    <div className=" row justify-content-center">

                        <div className={flaglogin ? ("col-4") : ("col-3")}>
                            <div className={flaglogin ? (" plan-block text-center p-1") : (" plan-block text-center p-3")}>
                                <p className="fs-3 fw-bolder">Silver</p>
                                <p><span className="fw-bolder fs-2">&#8377;1999</span><span className="text-sm">/year</span></p>
                                <hr className="dash m-auto mb-3" style={{ opacity: 1, color: "silver" }} />
                                <div className="features">
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Easy Online consultations</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Online Pharmacy</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Lab Tests at Home</p>
                                    <p><span className="cross"><i className="bi bi-x-lg"></i></span> <strike>Group Health Insurance</strike></p>
                                    <p><span className="cross"><i className="bi bi-x-lg"></i></span> <strike>SOS Ambulance Service</strike></p>
                                    <p><span className="cross"><i className="bi bi-x-lg"></i></span> <strike>Covid Care Packages</strike></p>
                                </div>
                                {!flaglogin && <div style={{ marginLeft: "-12vh" }}>
                                    <button className="btn btn-primary rounded-pill  shadow my-3 show" style={{ color: "silver" }} onClick={loginPage}>Subscribe</button>
                                </div>}
                                {flaglogin && <div style={{ marginLeft: "-12vh" }}>
                                    <button className="btn btn-primary rounded-pill  shadow my-3 show" style={{ color: "silver" }} onClick={(e) => { setPlan("SILVER"); }}>Subscribe</button>
                                </div>}
                            </div>
                        </div>
                        <div className={flaglogin ? ("col-4") : ("col-3")}>
                            <div className={flaglogin ? (" plan-block text-center p-1") : (" plan-block text-center p-3")}>
                                <p className="fs-3 fw-bolder">Gold</p>
                                <p><span className="fw-bolder fs-2">&#8377;3999</span><span className="text-sm">/year</span></p>
                                <hr className="dash m-auto mb-3" style={{ opacity: 1, color: "gold" }} />
                                <div className="features">
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Easy Online consultations</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Online Pharmacy</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Lab Tests at Home</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Group Health Insurance</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> SOS Ambulance Service</p>
                                    <p><span className="cross"><i className="bi bi-x-lg"></i></span><strike>Covid Care Packages</strike></p>
                                </div>
                                {!flaglogin && <div style={{ marginLeft: "-12vh" }}>
                                    <button className="btn btn-primary rounded-pill  shadow my-3 show" style={{ color: "gold" }} onClick={loginPage}>Subscribe</button>
                                </div>}
                                {flaglogin && <div style={{ marginLeft: "-12vh" }}>
                                    <button className="btn btn-primary rounded-pill  shadow my-3 show" style={{ color: "gold" }} onClick={(e) => { setPlan("GOLD"); }}>Subscribe</button>
                                </div>}
                            </div>
                        </div>
                        <div className={flaglogin ? ("col-4") : ("col-3")}>
                            <div className={flaglogin ? (" plan-block text-center p-1") : (" plan-block text-center p-3")}>
                                <p className="fs-3 fw-bolder">Platinum</p>
                                <p><span className="fw-bolder fs-2">&#8377;8999</span><span className="text-sm">/year</span></p>
                                <hr className="dash m-auto mb-3" style={{ opacity: 1, color: "yellow" }} />
                                <div className="features">
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Easy Online consultations</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Online Pharmacy</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Lab Tests at Home</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Group Health Insurance</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> SOS Ambulance Service</p>
                                    <p><span className="check"><i className="bi bi-check-lg"></i></span> Covid Care Packages</p>
                                </div>
                                {!flaglogin && <div style={{ marginLeft: "-12vh" }}>
                                    <button className="btn btn-primary rounded-pill  shadow my-3 show" style={{ color: "yellow" }} onClick={loginPage}>Subscribe</button>
                                </div>}
                                {flaglogin && <div style={{ marginLeft: "-12vh" }}>
                                    <button className="btn btn-primary rounded-pill  shadow my-3 show" style={{ color: "yellow" }} onClick={(e) => { setPlan("PLATINUM"); }}>Subscribe</button>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}