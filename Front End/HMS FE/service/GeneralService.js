import axios from "axios";

function getDoctorList() {
    return axios.get("/user/doctorsList");
}

function timeslotsAvailability() {
    return axios.get("/user/timeslotsAvailability")
}


export default { getDoctorList, timeslotsAvailability }