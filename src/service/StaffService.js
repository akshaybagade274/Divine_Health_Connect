import axios from "axios";
function showAppointment(page) {
    var pageSize = 8;
    console.log("page no. is: " + page)
    return axios.get(`/staff/appointments?page=${page}&pageSize=${pageSize}`)
}


function getListForReportUpload(page) {
    var pageSize = 6;
    return axios.get(`/staff/appointments/reportUpload?page=${page}&pageSize=${pageSize}`)
}

function getStaffDetails(staffId) {
    return axios.get(`/staff/${staffId}`)
}

function updateDetails(formData, staffId) {
    console.log("In Register patient " + formData.get("imgFile"))
    return axios.put(`/staff/${staffId}/update`, formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

    )
}

function changePassword(staffId, password) {
    return axios.patch(`/staff/${staffId}/changePassword`, password
    )
}
function uploadReport(aptId, formData) {
    return axios.post(`/staff/uploadReport/${aptId}`, formData)
}

function get2DaysAppointments() {
    return axios.get(`/staff/showCurrentAppointments`)
}

function getBloodDonorList(bloodGroup, pinCode, pageNo) {
    var pageSize = 3;
    return axios.get(`http://localhost:7070/staff/donorList?bGroup=${bloodGroup}&pinCode=${pinCode}&pageSize=${pageSize}&pageNo=${pageNo}`)
}
export default { changePassword, updateDetails, getStaffDetails, getBloodDonorList, getListForReportUpload, showAppointment, uploadReport, get2DaysAppointments }