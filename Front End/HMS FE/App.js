import './App.css';
import Home from "./Components/Home"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from './Components/Register';
import HealthPlans from './Components/HealthPlans';
import ContactUs from './Components/ContactUs';
import Career from './Components/Career';
import Login from './Components/Login';
import AdminProfile from './Components/AdminProfile';
import About from './Components/About';
import ProfilePatient from './Components/ProfilePatient';
import StaffProfile from './Components/StaffProfile';
import NotFound from './Components/NotFound';



function App() {
  return (
    <div>
      <Router>
        <div className='container-fluid'>
          <div className='row' >
            <Header></Header>
          </div>

          <div className='row' >



            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" exact component={Register} />
              <Route path="/healthPlans" exact component={HealthPlans} />
              <Route path="/aboutus" exact component={About} />
              <Route path="/contactus" exact component={ContactUs} />
              <Route path="/careers" exact component={Career} />
              <Route path="/patient" exact component={ProfilePatient} />
              <Route path="/login" exact component={Login} />
              <Route path="/admin" exact component={AdminProfile} />
              <Route path="/staff" exact component={StaffProfile} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
        {/* </div> */}
        <div className='row' >
          <Footer></Footer>
        </div>
      </Router>
      {/* </div> */}
    </div>
  );
}

export default App;
