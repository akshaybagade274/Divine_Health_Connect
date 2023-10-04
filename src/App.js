import './App.css';
import Home from "./Components/Home"
import Header from "./Components/Header"
import Register from './Components/Register'
import Login from './Components/Login'
import Contactus from './Components/ContactUs'

import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ViewProfile from './Components/ViewProfile';
import UpdateProfile from './Components/UpdateProfile';
import ChangePassword from './Components/ChangePassword';


function App() {
  return (
    <div>
      <Router>
        <div className='container-fluid'>
          <div className='row' >
            <Header />

          </div>

          <div className='row' >

            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/contactus" exact component={Contactus} />
              <Route path="/viewprofile" exact component={ViewProfile} />
              <Route path="/updateprofile" exact component={UpdateProfile} />
              <Route path="/changepassword" exact component={ChangePassword} />

            </Switch>
          </div>
        </div>
        {/* </div> */}
        <div className='row' >
          {/* <Footer></Footer> */}
        </div>
      </Router>
      {/* </div> */}
    </div>
  );
}

export default App;
