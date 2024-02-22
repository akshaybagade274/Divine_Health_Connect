import { useEffect } from "react";
import { useState } from "react";
import swal from "sweetalert";
import PatientService from "../service/PatientService";
import HealthPlans from "./HealthPlans";
import PatientFirstPage from "./PatientFirstPage";
import PaymentSuccessful from "./PaymentSuccessful";
import axios from "axios";
function Payment(props) {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const [creditCard, setCreditCard] = useState();
    const [debitCard, setdebitCard] = useState();
    const [wallet, setWallet] = useState();
    const [netBanking, setNetBanking] = useState();
    const [upi, setUPI] = useState();
    const [message, setMessage] = useState();
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
    const [modeOfPay, setModeOfPay] = useState("UPI");
    const id = sessionStorage.getItem('id')
    const [total, setTotal] = useState()

    useEffect(() => {
        if (props.data === "SILVER")
            setTotal(1999)
        if (props.data === "GOLD")
            setTotal(3999)
        if (props.data === "PLATINUM")
            setTotal(8999)


    }, [])

    function goBack() {
        props.setCmp(<PatientFirstPage />)
    }

    function proceedPayment() {
        PatientService.subscribePlan(id, props.data).then((res) => {
            swal("Info", res.data, "success")
            props.setCmp(<PaymentSuccessful />)
        }
        ).catch(
            swal("Error", "Please try Again", "error")
        )


    }

    return (<div>
        <hr></hr>
        <h1 style={{ color: "blue" }}>You Have Selected {props.data} Plan</h1>
        <h2 style={{ color: "darkblue" }}>Your Total Cost: {total} Rs</h2>
        <hr></hr>
        <h2 className="text-center" style={{ fontSize: "30px", color: "black" }}>Choose Payment Method</h2>
        <form className="form-control mb-5 bg-dark text-light" style={{ fontSize: "20px", boxShadow: "2px 2px 10px black" }}>
            <div className="form-group mb-2 form-check">
                <input
                    type="radio"
                    className="form-check-input "
                    id="creditCard"
                    name="payment"
                    defaultChecked
                    value={"CREDITCARD"}
                    onClick={() => { setModeOfPay("CREDITCARD") }}
                />
                <label className="d-inline">Credit Card</label>
            </div>

            <div className="form-group mb-2 form-check">
                <input
                    type="radio"
                    className="form-check-input"
                    id="debitCard"
                    name="payment"

                    onClick={() => { setModeOfPay("DEBITCARD") }}
                />
                <label>Debit Card</label>
            </div>

            <div className="form-group mb-2 form-check">
                <input
                    type="radio"
                    className="form-check-input"
                    id="wallet"
                    name="payment"
                    onClick={() => { setModeOfPay("WALLET") }}
                />
                <label>Wallet</label>
            </div>

            <div className="form-group mb-2 form-check">
                <input
                    type="radio"
                    className="form-check-input"
                    id="netBanking"
                    name="payment"
                    onClick={() => { setModeOfPay("NETB") }}
                />
                <label>NetBanking</label>
            </div>

            <div className="form-group mb-2 form-check">
                <input
                    type="radio"
                    className="form-check-input"
                    id="upi"
                    name="payment"
                    onClick={() => { setModeOfPay("UPI") }}
                />
                <label>UPI</label>
            </div>
            <button
                className="btn btn-warning mb-2 me-2 mt-3 show"
                onClick={proceedPayment}
            >
                Proceed
            </button>
            <button className="btn btn-danger mb-2 me-2 mt-3 show" onClick={goBack}>
                Cancel
            </button>
        </form>

    </div>)

}

export default Payment;

