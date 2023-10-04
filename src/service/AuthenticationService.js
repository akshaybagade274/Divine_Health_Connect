import axios from 'axios';
axios.defaults.baseURL = "http://localhost:7171";
class AuthenticationService {
  authenticateUser(body) {
    //make api call for auth
    // console.log('auth call', body);
    return axios.post('/user/login', body);
  }

  storeUserDetails(email) {
    console.log('add email' + email);
    //user has logged in successfully : so add it's details under session storage
    localStorage.setItem('email', email);
    return true;
  }
  removeUserDetails() {
    // console.log('rem user');
    localStorage.removeItem('email');
  }
  isUserLoggedIn() {
    // console.log('chk if user logged in');
    return localStorage.getItem('email') === null ? false : true;
  }


}
//export it's instance , so that it's methods can be called from components
export default new AuthenticationService();
