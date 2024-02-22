import NavBar from "./NavBar";
import { useState, useEffect, useContext } from "react";
import AuthenticationService from "../service/AuthenticationService";
import GeneralService from "../service/GeneralService"
import swal from "sweetalert";
import PatientService from "../service/PatientService";
import { UserContext } from "./Contexts";
import PatientFirstPage from "./PatientFirstPage";
import axios from "axios";
function BookAppointment(props) {
    if (sessionStorage.getItem('jwt'))
        axios.defaults.headers["Authorization"] = 'Bearer ' + sessionStorage.getItem('jwt')

    const [loginFlag, setLoginFlag] = useState(false)
    const [list, setList] = useState([]);
    const [docList, setDocList] = useState([])
    const [doc, setDoc] = useState();
    const [timeSlot, setTimeSlot] = useState('');
    const [searchList, SetSearchList] = useState([]);
    const { user, setUser, cmp, setCmp } = useContext(UserContext)
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [available, setAvailable] = useState([])

    const [todayDate, setTodayDate] = useState(new Date().toISOString().split('T')[0])
    const [todayFlag, setTodayFlag] = useState(false)
    const [tomorrowDate, setTomorrowDate] = useState((new Date(todayDate).getFullYear() + "-" + todayDate.split("-")[1]) + "-" + (new Date(todayDate).getDate() + 1));
    console.log(new Date(todayDate).getHours() + 12)
    var t1 = new Date()
    console.log(t1.toLocaleString())

    console.log(tomorrowDate)
    var time1 = parseInt(t1.toLocaleString('en-GB').split(" ")[1].split(":")[0]);
    console.log(time1)
    useEffect(() => {
        GeneralService.getDoctorList().then((res) => {
            setDocList(res.data)
        }
        ).catch((err) => {
            swal("Info", "Server Not available", "error")
        })

        GeneralService.timeslotsAvailability().then((res) => {
            setAvailable(res.data)
            console.log(res.data);
        }).catch((err) => console.log(err))



    }, [])

    var l = available.filter(t => { if (t.timeSlot === "MORNING" && t.date === todayDate) return t }).map(v => v.capacity)
    console.log(l > 12)

    const sortedList = () => {
        SetSearchList(docList.filter((doc) => { return (timeSlot === "MORNING" || timeSlot === "AFTERNOON") && doc.shift === "I" }))
    }
    const book = (e) => {
        if (date && doc && timeSlot) {
            let d = new Date(date)
            let docId = doc
            let newAppointment = {
                timeSlot,
                date,
                docId
            }


            PatientService.bookAppointment(user.id, newAppointment).then((res) => {
                swal("Appointment Info", "Appointment Booked Successfully", "success")
                setCmp(<PatientFirstPage />)

            }).catch((err) => swal("Info", "Something went wrong", "error"))
        }
    }

    return (
        <div>
            {/* https://www.qmatic.com/hubfs/images/gl/blog/patient-appointment-systems-in-hospitals-featured2.png */}
            <div className="Container-fluid " style={{ background: "linear-gradient(to left, #F6FFFE, skyblue  )" }}>
                <h1 className='text-center'>Book Appointment</h1>
                <div className="row justify-content-center " style={{ height: "65vh" }}>
                    <form className="col-6  p-4 border border-primary shadow m-4" style={{ background: "linear-gradient(to left, #F6FFFE, skyblue)", }}>

                        {/* <input className="form-control my-3" type="date" min={todayDate} max={tomorrowDate} required onChange={(e) => { setDate(e.target.value); console.log(e.target.value); if (new Date(e.target.value) !== new Date()) { setTodayFlag(true) } else { setTodayFlag(false) } }} /> */}
                        <input className="form-control my-3" type="date" min={todayDate} max={tomorrowDate} required onChange={(e) => {
                            ///  2022-09-26
                            setTodayFlag(parseInt(e.target.value.split("-")[2]) !== new Date().getDate() ? true : false)
                            setDate(e.target.value);
                            //console.log(new Date(e.target.value).toLocaleDateString() !== new Date().toLocaleDateString()); console.log(new Date(e.target.value) !== new Date())


                        }} />

                        <div>
                            <select className="form-control my-3" onChange={(e) => { setTimeSlot(e.target.value); sortedList() }} required>
                                <option value=''>---Select Time Slot---</option>
                                {(todayFlag || (time1) < 9) && <option value='MORNING'
                                    disabled={(parseInt(available.filter(t => { if (t.timeSlot === "MORNING" && (t.date === date)) return t }).map(v => v.capacity)) === 0 ? true : false)}>
                                    Morning (9am - 12am )  --{`>`}  Available ({available.filter(t => { if (t.timeSlot === "MORNING" && (t.date === date)) return t }).map(v => v.capacity)})</option>}
                                {(todayFlag || (time1) < 13) && <option value='AFTERNOON' disabled={parseInt(available.filter(t => { if (t.timeSlot === "AFTERNOON" && (t.date === date)) return t }).map(v => v.capacity)) === 0 ? true : false}>
                                    Afternoon  (1 pm - 4 pm ) --{`>`} Available ({available.filter(t => { if (t.timeSlot === "AFTERNOON" && (t.date === date)) return t }).map(v => v.capacity)})</option>}
                                {(todayFlag || (time1) < 16) && <option value='EVENING' disabled={parseInt(available.filter(t => { if (t.timeSlot === "EVENING" && (t.date === date)) return t }).map(v => v.capacity)) === 0 ? true : false}>
                                    Evening  (4pm to 7pm )--{`>`} Available ({available.filter(t => { if (t.timeSlot === "EVENING" && (t.date === date)) return t }).map(v => v.capacity)})</option>}
                                {(todayFlag || (time1) < 20) && <option value='NIGHT' disabled={parseInt(available.filter(t => { if (t.timeSlot === "NIGHT" && (t.date === date)) return t }).map(v => v.capacity)) === 0 ? true : false}>
                                    Night  (8pm to 11pm ) --{`>`} Available ({available.filter(t => { if (t.timeSlot === "NIGHT" && (t.date === date)) return t }).map(v => v.capacity)})</option>}
                            </select>

                        </div>
                        <div>
                            <select className="form-control my-3" onChange={(e) => { setDoc(e.target.value) }} required>
                                <option value=''>---Select Doc---</option>
                                {timeSlot.length === 0 && <option selected value=''>{"Select Doctor"}</option>}
                                {docList.filter((doc) => { return ((timeSlot === "MORNING" || timeSlot === "AFTERNOON") && doc.shift === "I") || ((timeSlot === "EVENING" || timeSlot === "NIGHT") && doc.shift === "II") }).map((doc) => { return <option key={doc.id} value={doc.id}>{doc.firstName} </option> })}
                                {/* {docList.map(function (item, index) { return <option value={item.id}>{item.firstName}</option> })} */}
                                {/* .filter((doc) => { (timeSlot === "MORNING" || timeSlot === "AFTERNOON") && doc.shift === "I" }))*/}
                            </select>
                        </div>
                        <div>
                            <button className="form-control my-3" onClick={book}>Confirm appointment</button>
                        </div>
                    </form>


                </div>

            </div>
        </div>


    )
}

export default BookAppointment;