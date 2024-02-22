import axios from 'axios';
axios.defaults.baseURL = "http://localhost:7070";

function authenticateUser(body) {
  //make api call for auth
  console.log('auth call', body);
  return axios.post('/user/login', {
    email: body.email,
    password: body.password,
  });
}

function storeUserDetails(email, jwt, role, user, id) {
  // console.log('add user');
  //since user has logged in : now for every request to the backend : add req auth interceptor
  console.log('store details: ' + jwt)
  this.setupRequestInterceptor(jwt);
  //user has logged in successfully : so add it's details under session storage
  sessionStorage.setItem('user_dtls', email);
  sessionStorage.setItem('user_role', role);
  sessionStorage.setItem('jwt', jwt);
  sessionStorage.setItem('user', user);
  sessionStorage.setItem('id', id)
}
function removeUserDetails() {
  console.log('rem user');
  sessionStorage.removeItem('user_dtls');
  sessionStorage.removeItem('user_role');
  sessionStorage.removeItem('jwt');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('id');
}
function isUserLoggedIn() {
  console.log('chk if user logged in');
  return sessionStorage.getItem('user_dtls') === null ? false : true;
}
function getUserName() {
  return sessionStorage.getItem('user_dtls');
}

function getUserRole() {
  return sessionStorage.getItem('user_role');
}

//set up axios request interceptor for JWT

function setupRequestInterceptor(jwt) {
  //  const basicAuth = 'Basic ' + window.btoa(userName + ':' + password);

  axios.interceptors.request.use((config) => {
    if (this.isUserLoggedIn()) {

      //adding the authorization header to config
      config.headers.Authorization = 'Bearer ' + jwt;
    }
    //return config
    return config;
  });
}

function fetchUserImage(id) {

  console.log(this.setupRequestInterceptor(sessionStorage.getItem('jwt')))
  return axios.get(`/patient/${id}/image`, { responseType: 'blob' }
  );

}

//export it's instance , so that it's methods can be called from components
export default { authenticateUser, fetchUserImage, setupRequestInterceptor, getUserRole, getUserName, isUserLoggedIn, removeUserDetails, storeUserDetails }
