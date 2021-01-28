import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';

import Create from "./Project/Create";
import Edit from "./Project/Edit";
import Delete from "./Project/Delete";
import Details from "./Project/Details";
import LoginForm from "../components/LoginForm";
import Logout from "../components/Logout";
import FirebaseLoginForm from "../components/FirebaseLoginForm";
import UserDashboard from "./UserManagementDashboard/UserDashboard";
import UpdateUser from "./UserManagementDashboard/UpdateUser";
import BlockUser from "./UserManagementDashboard/BlockUser";
import DeleteUser from "./UserManagementDashboard/DeleteUser";
import MachineStatusTable from "./Machines/MachineStatusTable";

import MachineList from "./Machines/MachineList";


function MainNavigation() {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/htecmms" exact component={MachineStatusTable}/>
                <Route path="/htecmms/streams/new" exact component={Create}/>
                <Route path="/htecmms/streams/edit/:id" exact component={Edit}/>
                <Route path="/htecmms/streams/delete/:id" exact component={Delete}/>
                <Route path="/htecmms/streams/:id" exact component={Details}/>
                <Route path="/htecmms/login/" exact component={LoginForm}/>
                <Route path="/htecmms/phone-login/" exact component={FirebaseLoginForm}/>
                <Route path="/htecmms/logout/" exact component={Logout}/>
                <Route path="/htecmms/users/" exact component={UserDashboard}/>
                <Route path="/htecmms/users/edit/:id" exact component={UpdateUser}/>
                <Route path="/htecmms/users/block-unblock/:id" exact component={BlockUser}/>
                <Route path="/htecmms/users/delete/:id" exact component={DeleteUser}/>
                <Route path="/htecmms/machines/data" exact component={MachineList}/>
            </Switch>
        </React.Fragment>
    );
}

const mapStateToProps = (state) =>{
    return {isAuthenticated: state.auth.isAuthenticated}
}

export default connect(mapStateToProps)(MainNavigation);
