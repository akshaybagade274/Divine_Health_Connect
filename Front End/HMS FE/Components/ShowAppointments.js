import React, { useState, useEffect, useCallback } from 'react'
import StaffService from '../service/StaffService';
import axios from 'axios';
export default function ShowAppointment(props) {

    const [list, setList] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')

    useEffect(() => {

        StaffService.showAppointment(0).then((result) => {
            setList(result.data)
        }).catch((error) => {
            console.log(error);
        })

    }, [])

    const getAppointments = () => {
        StaffService.showAppointment(pageNo).then((result) => {
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
        StaffService.showAppointment(value).then((result) => {
            if (result.data.length !== 0) {

                setList(result.data)
            }

        }).catch((error) => {
            console.log(error);
        })

    }

    useEffect(() => {
        getAppointments()
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
        <div className="container text-center">
            <div className='row justify-content-md-center'>
                <div className='col'>
                    <h1 style={{ color: "#0A7685" }}>Appointments</h1>
                </div>
            </div>
            <div className='row  justify-content-md-center'>
                <div className='col-11'>
                    <table class="table table-striped table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr no.</th>
                                <th scope="col">Patient Name</th>
                                <th scope="col">TimeSlot</th>
                                <th scope='col'>Doctor</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => {


                                return <tr key={index}>
                                    <td>{(pageNo * 8) + index + 1}</td>
                                    <td >{item.patientId.firstName} {item.patientId.lastName}</td>

                                    <td>{item.timeSlot}</td>
                                    <td>{item.doctor.firstName} {item.doctor.lastName}</td>
                                    <td>{item.date}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='row justify-content-md-center'>
                <div className='col-3'>

                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" onClick={getPrevPage} > Prev</a></li>
                            <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(0)}>1</a></li>
                            <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(1)}>2</a></li>
                            <li class="page-item"><a class="page-link" onClick={() => AppoitForPage(2)}>3</a></li>
                            <li class="page-item"><a class="page-link active" onClick={getNextPage}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div >
        </div >
    )
}