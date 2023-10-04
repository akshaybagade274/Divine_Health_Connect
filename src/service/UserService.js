import axios from "axios";


function register(formData) {

    return axios.post("/user/register", formData,
        {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

    )
}

// uploadImage(id, imgFile) {
//     return axios.post(`/patient/${id}/image`, imgFile)
// }

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


function getUserDetails(email) {
    console.log("in axios get " + email)
    return axios.get(`/user/${email}`)
}

function deleteUser(userId) {
    return axios.delete(`/user/${userId}/delete`)
}

// function getUserDetails() {
//     console.log("user details from local storage " + JSON.parse(localStorage.getItem('user')))
//     return JSON.parse(localStorage.getItem('user'));
// }



export default { register, getUserDetails, updateDetails, deleteUser };