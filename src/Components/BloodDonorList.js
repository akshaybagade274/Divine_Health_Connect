import "../CSS/register.css"
import { useState, useEffect } from "react";
import StaffService from "../service/StaffService";
import axios from "axios";
function BloodDonorList() {

    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')
    const [list, setList] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [bloodGroup, setBloodGroup] = useState("");
    const [pinCode, setPinCode] = useState("");


    const getDonorList = () => {

        StaffService.getBloodDonorList(bloodGroup, pinCode, 0).then((result) => {
            setList(result.data)
        }).catch((error) => {
            console.log(error);
        })

    }

    const getList = () => {
        StaffService.getBloodDonorList(bloodGroup, pinCode, pageNo).then((result) => {
            if (result.data.length !== 0) {

                setList(result.data)
            }
            else {
                getPrevPage();
            }

        }).catch((error) => {
            console.log(error);
        })

    }

    const AppoitForPage = (value) => {
        StaffService.getBloodDonorList(bloodGroup, pinCode, value).then((result) => {
            if (result.data.length !== 0) {

                setList(result.data)
            }

        }).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        getList()
        console.log("pageNo in use effect: " + pageNo)
    }, [pageNo])

    const getPrevPage = () => {
        if (pageNo > 0) {
            setPageNo(pageNo - 1)
        }
        //console.log("in prev pageNo: " + pageNo)

    }

    const getNextPage = () => {
        setPageNo(pageNo + 1)
        // console.log("in next pageNo: " + pageNo)
    }

    return (
        <div>
            <div className="container" style={{ background: "linear-gradient(to left, yellow, skyblue,white)" }}>
                <div className="row" >
                    {/* style={{ height: "20vh" }} */}
                    <div className="row gy-5"></div>
                    <div className="container ">
                        <div className="row justify-content-start">
                            {/* <div className="col align-self-center"> */}
                            <div className=" col-6 col-md-3 offset-md-3">
                                <div className="form-group form-inline">
                                    <label style={{ marginRight: '10px' }} className="font-weight-bold"><b>Blood Group </b></label>
                                    <select className="custom-select" onChange={(event) => { setBloodGroup(event.target.value) }}>
                                        <option>--Select--</option>
                                        <option value="O_POSITIVE">O+</option>
                                        <option value="O_NEGATIVE" >O-</option>
                                        <option value="A_POSITIVE">A+</option>
                                        <option value="A_NEGATIVE">A-</option>
                                        <option value="B_POSITIVE">B+</option>
                                        <option value="B_NEGATIVE">B-</option>
                                        <option value="AB_POSITIVE">AB+</option>
                                        <option value="AB_NEGATIVE">AB-</option>
                                    </select>
                                </div>
                            </div>
                            <div className=" col-6 ">
                                <div className="form-group form-inline">
                                    <label htmlFor="pin" style={{ marginRight: '10px' }}><b>Pin Code</b></label>
                                    <input type="text" id="pin" placeholder="Pin Code"
                                        onChange={(event) => { setPinCode(event.target.value) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-2">
                        <div className="col col-md-6 offset-md-4 ">
                            <button type="button" className=" btn btn-primary show" onClick={getDonorList} >Submit</button>
                        </div>
                        {/* </div> */}
                    </div>
                    {list.length !== 0 && <div>
                        <div className='row gy-3 justify-content-md-center'>
                        <div className='col  text-start' style={{ marginLeft: "60px" }}>
                            <h1 style={{ color: "#0A7685" }}>Blood Donor List</h1>
                        </div>
                    </div>
                        <div className='row  justify-content-md-center'>
                            <div className='col-11'>
                                <table class="table table-striped table-dark table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr no.</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">phone</th>
                                            <th scope='col'>Blood Group</th>
                                            <th scope="col">Address</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list.map((item, index) => {


                                            return <tr key={index}>
                                                <td>{(pageNo * 8) + index + 1}</td>
                                                <td >{item.user.firstName} {item.user.lastName}</td>

                                                <td>{item.user.phone}</td>
                                                <td>{item.user.bloodGroup}</td>
                                                <td>{item.addressLine1} {item.addressLine2} {item.city} </td>

                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='row justify-content-md-center' style={{ marginBottom: "40vh", marginTop: "5vh" }}>
                            <div className='col-3 align-self-end'>

                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link active" onClick={getPrevPage} > Prev</a></li>
                                        <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(0)}>1</a></li>
                                        <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(1)}>2</a></li>
                                        <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(2)}>3</a></li>
                                        <li class="page-item"><a class="page-link active" onClick={getNextPage}>Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div >
                    </div>}
                    {/* </div > */}
                </div>

            </div>
        </div>)
}

export default BloodDonorList;