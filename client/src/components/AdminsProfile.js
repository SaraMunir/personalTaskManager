import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './Navbar'
import Dashboard from './DashBoard';
import BackLog from './BackLog'
import MyMembers from './MyMembers'
import MyGroceryList from './Grocery/GroceryList';
import Settings from './Settings';
import MemberProfile from './MemberProfile';
import MemberTimeSheet from './MemberDetails/MemberTimeSheet';

function AdminsProfile() {
    return (
        <div>
            <Router>
                <Navbar/>
                <Route exact path={["/AdminsProfile/Dashboard"]} component={Dashboard}/>
                <Route exact path={["/AdminsProfile/BackLog"]} component={BackLog}/>
                <Route exact path={["/AdminsProfile/MyMembers"]} component={MyMembers}/>
                <Route exact path={["/AdminsProfile/MyGroceryList"]} component={MyGroceryList}/>
                <Route exact path={["/AdminsProfile/Settings"]} component={Settings}/>
                <Route exact path={["/AdminsProfile/MemberProfile/:memberId/:memberName"]} component={MemberProfile}/>
                <Route exact path={["/AdminsProfile/MemberProfile/:memberId/:memberName/Timesheets"]} component={MemberTimeSheet}/>
                {/* /AdminsProfile/MemberProfile/${memberDetail._id}/Timesheets */}
            </Router>
        </div>
    )
}

export default AdminsProfile
