import axios from 'axios';
function getMessageFromAPI(userName) {
  //adding basic auth header
  //  const password = '1234';
  //  const basicAuth = 'Basic ' + window.btoa(userName + ':' + password);
  //console.log('msg api ', userName, password, basicAuth);
  // return axios.get(`http://localhost:8080/api/test/${userName}`, {
  //   headers: {
  //     authorization: basicAuth,
  //   },
  //  });
  const data = axios.get(`/patient/3`);
  console.log(data);
  return data;
}
function fetchUserImage(id) {
  console.log("id " + id)
  console.log("jwt : " + sessionStorage.getItem('jwt'))
  const img = axios.get(`/admin/${id}/image`, { responseType: 'blob' });
  return img;
}

function fetchPatientImage(id) {
  console.log("id " + id)
  console.log("jwt : " + sessionStorage.getItem('jwt'))
  const img = axios.get(`/patient/${id}/image`, { responseType: 'blob' });
  return img;
}

function fetchStaffImage(id) {
  console.log("id " + id)
  console.log("jwt : " + sessionStorage.getItem('jwt'))
  const img = axios.get(`/staff/${id}/image`, { responseType: 'blob' });
  return img;
}

// function uploadAdminImage(adminId, imgFile) {
//   console.log("in upload admin image")
//   return axios.post(`/admin/${adminId}/image`, imgFile)
// }

function uploadImage(id, imgFile) {
  return axios.post(`/admin/${id}/image`, imgFile)
}

function uploadStaffImage(staffId, imgFile) {
  return axios.post(`/staff/${staffId}/uploadImage`, imgFile)
}

function uploadPatientImage(patId, imgFile) {
  return axios.post(`/patient/${patId}/image`, imgFile)
}



export default { uploadPatientImage, uploadStaffImage, uploadImage, fetchStaffImage, fetchPatientImage, fetchUserImage, getMessageFromAPI }
