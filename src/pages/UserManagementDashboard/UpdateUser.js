import React from 'react';
import {connect } from 'react-redux';
import _ from 'lodash';

import {fetchUser, editUser, getUserGroup} from "../../store/actions/user";
import {getSections} from "../../store/actions/company";
import UserForm from "./UserForm";
import Spinner from "../../components/Spinner";

class UpdateUser extends React.Component{
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
        this.props.getUserGroup();
        this.props.getSections();
    }

    onSubmit = (formValues) => {
        this.props.editUser(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.user || !this.props.groups || !this.props.sections){
            return <Spinner/>
        }
        const initValue = _.pick(this.props.user, "username", "name", "employee_id")
        return(
            <UserForm
                onSubmit={this.onSubmit}
                // initialize the field which will be populated
                initialValues = {initValue}
                groups={this.props.groups}
                sections={this.props.sections}
                is_update={true}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {user: state.users.user, groups:state.users.groups, sections:state.company.sections}
};
export default connect(mapStateToProps, {fetchUser, editUser, getUserGroup, getSections})(UpdateUser);