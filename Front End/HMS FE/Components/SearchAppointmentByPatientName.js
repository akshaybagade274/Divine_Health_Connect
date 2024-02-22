import { useEffect } from "react";
import { useState } from "react";
import StaffService from "../service/StaffService";
import axios from "axios";

function SearchAppointmentByPatientName() {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')

    const [list, setList] = useState([])
    const [searchList, setSerachList] = useState([])
    const [criteria, setCriteria] = useState('Patient');

    useEffect(() => {

        StaffService.get2DaysAppointments().then((res) => {
            setList(res.data)
            setSerachList(res.data)
        }).catch((err) => { console.log(err) })


    }, [])

    const filterList = (searchPatient) => {

        if (criteria === 'Patient') {
            if (searchPatient == undefined) {
                setSerachList(list);
            } else {
                setSerachList(list.filter((x) =>
                    x.patientId.firstName.toUpperCase().match(searchPatient.toUpperCase())))
            }
        } else if (criteria === 'Slot') {
            if (searchPatient == undefined) {
                setSerachList(list);
            } else {
                setSerachList(list.filter((x) =>
                    x.timeSlot.match(searchPatient.toUpperCase())))
            }
        } else if (criteria === 'Doctor') {
            if (searchPatient == undefined) {
                setSerachList(list);
            } else {
                setSerachList(list.filter((x) =>
                    x.doctor.firstName.toUpperCase().match(searchPatient.toUpperCase())))
            }
        }


    }
    return (
        <div className="container text-center">
            <div className='row justify-content-md-center'>
                <div className='col'>
                    <h1 style={{ color: "#0A7685" }}>Search Appointments</h1>
                </div>
            </div>
            <div >
                <input type="text" className="mb-3" style={{ height: "37px", width: '40vh' }}
                    placeholder="Search"
                    onChange={(e) => { filterList(e.target.value) }} />
                <span style={{ marginLeft: '2vh' }}>
                    <select defaultValue='Patient' onChange={(e) => setCriteria(e.target.value)}
                        style={{ height: "30px", width: '20vh' }}>
                        <option value='Patient'>Patient</option>
                        <option value='Slot'>Time Slot</option>
                        <option value='Doctor'>Doctor</option>
                    </select>
                </span>
            </div>
            <div className='row  justify-content-md-center' >
                <div className='col-11' >
                    <div style={{ height: '50vh', width: '100%', overflow: 'auto' }} >

                        <table class="table table-striped table-dark table-hover" >
                            <thead style={{ position: "sticky", top: 0, textAlign: "center" }} class="thead-dark" >
                                <tr>
                                    <th scope="col">Sr no.</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">TimeSlot</th>
                                    <th scope='col'>Doctor</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: "center", verticalAlign: "middle" }}>
                                {searchList.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{++index}</td>
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
            </div>
        </div >

    )


}

export default SearchAppointmentByPatientName;