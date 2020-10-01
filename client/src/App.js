import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WelcomePage from './components/WelcomPage';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'

import MemberProfile from './components/MemberProfile';
import LogOut from './components/LogOut';
import Profiles from './components/Profiles'
import AdminsLogIn from './components/AdminsLogIn';
import AdminsProfile from './components/AdminsProfile';
import MemberTimeSheet from './components/MemberDetails/MemberTimeSheet';
function App() {
  return (
    <div >
      <Router>
        <Route path={["/Profiles"]} component={Profiles} />
        <Route exact path={["/AdminsLogIn"]} component={AdminsLogIn} />
        <Route path={["/AdminsProfile"]} component={AdminsProfile} />
        {/*-------------sssssssssss-----------*/}
        <Route exact path={["/","/welcomePage"]} component={WelcomePage} />
        <Route exact path={["/LogIn"]} component={LogIn}/>
        <Route exact path={["/SignUp"]} component={SignUp}/>
        <Route exact path={["/MemberProfile/:memberId/:memberName"]} component={MemberProfile}/>
        <Route exact path={["/MemberProfile/:memberId/:memberName/Timesheets"]} component={MemberTimeSheet}/>
        <Route exact path={["/logout"]} component={LogOut}/> 
      </Router>
    </div>
  );
}

export default App;
