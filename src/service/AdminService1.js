import axios from "axios";



function fetchUserImage(id) {

    const img = axios.get(`/admin/${id}/image`, { responseType: 'blob' });
    return img;
}

function registerStaff(formData) {
    console.log("In Register staff " + formData.get("imgFile"))
    return axios.post("/admin/add/staff", formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

    )
}


function getStaffList(page) {
    let pageSize = 6
    return axios.get(`/admin/staffSchedule?page=${page}&pageSize=${pageSize}`)
}

function updateSchedule(list) {
    return axios.post(`/admin/updateShifts`, list)
}

function changePassword(adminId, password) {
    return axios.patch(`/admin/${adminId}/changePassword`, password
    )
}

function getApplicantsList(page) {
    let pageSize = 6
    return axios.get(`/careers/applicantsList?page=${page}&pageSize=${pageSize}`)
}

function getResume(applnId) {
    return axios.get(`/careers/${applnId}/resume`, { responseType: 'blob' })
}

function apply(formData) {
    return axios.post(`/careers/newApplication`, formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
}

function updateApplStatus(applnId) {
    console.log(applnId)
    return axios.post(`/careers/${applnId}/updateStatus`)
}


export default { changePassword, registerStaff, fetchUserImage, updateSchedule, getStaffList, getApplicantsList, getResume, apply, updateApplStatus }