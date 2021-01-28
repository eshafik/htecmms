import React from 'react';
import {connect} from 'react-redux';

import UserForm from "./UserForm";
import {createUser, getUserGroup} from "../../store/actions/user";
import {getSections} from "../../store/actions/company";
import Spinner from "../../components/Spinner";
import {Redirect} from "react-router-dom";

class Create extends React.Component{
    componentDidMount() {
        this.props.getUserGroup();
        this.props.getSections();
    }

    onSubmit = (formValues) => {
        this.props.createUser(formValues);
    }
    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/htecmms/phone-login"/>;
        }
        if (!this.props.groups || !this.props.sections){
            return <Spinner/>
        }
        return(
            <React.Fragment>
                <UserForm
                    onSubmit={this.onSubmit}
                    groups = {this.props.groups}
                    sections = {this.props.sections}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        groups: state.users.groups,
        sections: state.company.sections,
        isAuthenticated: state.fbAuth.isUserAuthenticated
    }
}

export default connect(mapStateToProps, {createUser, getUserGroup, getSections})(Create);