import React from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';

import List from "./Project/List";
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
import MaterialUIPickers from "./Machines/CustomDateTime";

import MachineList from "./Machines/MachineList";


function MainNavigation() {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={List}/>
                <Route path="/streams/new" exact component={Create}/>
                <Route path="/streams/edit/:id" exact component={Edit}/>
                <Route path="/streams/delete/:id" exact component={Delete}/>
                <Route path="/streams/:id" exact component={Details}/>
                <Route path="/login/" exact component={LoginForm}/>
                <Route path="/phone-login/" exact component={FirebaseLoginForm}/>
                <Route path="/logout/" exact component={Logout}/>
                <Route path="/users/" exact component={UserDashboard}/>
                <Route path="/users/edit/:id" exact component={UpdateUser}/>
                <Route path="/users/block-unblock/:id" exact component={BlockUser}/>
                <Route path="/users/delete/:id" exact component={DeleteUser}/>
                <Route path="/machines/live" exact component={MachineList}/>
                <Route path="/date" exact component={MaterialUIPickers}/>
            </Switch>
        </React.Fragment>
    );
}

const mapStateToProps = (state) =>{
    return {isAuthenticated: state.auth.isAuthenticated}
}

export default connect(mapStateToProps)(MainNavigation);
