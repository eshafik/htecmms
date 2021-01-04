import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {Tabs, Tab} from "react-bootstrap";
import history from "../../history";

import {fetchStreams} from "../../store/actions/stream";
import Table from "../../components/Table";
import UsersList from "./UsersList";
import CreateUser from "./CreateUser";

class UserDashboard extends React.Component{

    render() {
        if (! this.props.isAuthenticated){
            return <Redirect to="/phone-login" />;
        }

        return(
            <React.Fragment>
                <Tabs defaultActiveKey="users">
                    <Tab eventKey="users" title="Users List">
                        <UsersList/>
                    </Tab>
                    <Tab eventKey="create" title="Create New User">
                        <CreateUser/>
                    </Tab>
                </Tabs>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {isAuthenticated: state.fbAuth.isUserAuthenticated};
};
export default connect(mapStateToProps)(UserDashboard);