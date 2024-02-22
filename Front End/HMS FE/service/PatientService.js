import axios from "axios";


function register(formData) {
    console.log("In Register patient " + formData.get("imgFile"))
    return axios.post("/patient/register", formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

    )
}

function uploadImage(id, imgFile) {
    return axios.post(`/patient/${id}/image`, imgFile)
}

function updateDetails(formData, patId) {
    console.log("In Register patient " + formData.get("imgFile"))
    return axios.put(`/patient/${patId}/update`, formData
        ,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

    )
}


function getPatientDetails(patId) {
    return axios.get(`/patient/${patId}`)
}

function getReports(patId, page) {
    let pageSize = 7
    return axios.get(`/patient/${patId}/reports?page=${page}&pageSize=${pageSize}`)
}

function getReport(aptId) {
    return axios.get(`/patient/report/${aptId}`, { responseType: 'blob' })
}
function bookAppointment(patId, newAppointment) {
    return axios.post(`/patient/${patId}/bookAppointment`, newAppointment)

}

function subscribePlan(id, plan) {
    return axios.patch(`/patient/${id}/subscribePlan?plan=${plan}`)
}
function changePassword(patId, password) {
    return axios.patch(`/patient/${patId}/changePassword`, password
    )
}

export default { getReport, getReports, getPatientDetails, updateDetails, uploadImage, register, bookAppointment, subscribePlan, changePassword };