import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WelcomePage from './components/WelcomPage';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import Dashboard from './components/DashBoard'
import DragPage from './components/DragPage'
import PicturePage from './components/PictureGrid/PicturePage'
import Navbar from './components/Navbar'
import BackLog from './components/BackLog'
import MyMembers from './components/MyMembers'
import MemberProfile from './components/MemberProfile';
import MyGroceryList from './components/Grocery/GroceryList'
function App() {
  return (
    <div >
      <Router>
        <Navbar />
        <Route exact path={["/","/welcomePage"]} component={WelcomePage} />
        <Route exact path={["/LogIn"]} component={LogIn}/>
        <Route exact path={["/SignUp"]} component={SignUp}/>
        <Route exact path={["/Dashboard"]} component={Dashboard}/>
        <Route exact path={["/DragPage"]} component={DragPage}/>
        <Route exact path={["/PicturePage"]} component={PicturePage}/>
        <Route exact path={["/BackLog"]} component={BackLog}/>
        <Route exact path={["/MyMembers"]} component={MyMembers}/>
        <Route exact path={["/MyGroceryList"]} component={MyGroceryList}/>
        {/* \/MemberProfile/:memberId/:memberName} */}
        <Route exact path={["/MemberProfile/:memberId/:memberName"]} component={MemberProfile}/>
      </Router>
    </div>
  );
}

export default App;
