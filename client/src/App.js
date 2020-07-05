import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WelcomePage from './components/WelcomPage';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Dashboard from './components/DashBoard'
function App() {
  return (
    <div >
      <Router>
        <Route exact path={["/","/welcomePage"]} component={WelcomePage} />
        <Route exact path={["/LogIn"]} component={LogIn}/>
        <Route exact path={["/SignUp"]} component={SignUp}/>
        <Route exact path={["/Dashboard"]} component={Dashboard}/>
      </Router>
    </div>
  );
}

export default App;
