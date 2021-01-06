import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import Spinner from "../../components/Spinner";

import {fetchUsers} from "../../store/actions/user";
import Table from "../../components/Table";

class UsersList extends React.Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderList() {

        return this.props.users.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.employee_id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.group_name}</td>
                    <td>{user.section_name}</td>
                    <td>{user.is_blocked ? "Blocked" : "Active"}</td>
                    <td><Link to={`/users/edit/${user.id}`} className="btn btn-primary">Edit</Link></td>
                    <td>
                        <Link to={`/users/block-unblock/${user.id}`}
                              className="btn btn-warning">{user.is_blocked ? "Unblock" : "Block"}
                        </Link>
                    </td>
                    <td><Link to={`/users/delete/${user.id}`} className="btn btn-danger">Delete</Link></td>
                </tr>
            )
        });
    };

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/phone-login"/>;
        }
        if (!this.props.users) {
            return <Spinner/>

        }

        return (
            <React.Fragment>
                <Table
                    title="User Lists"
                    subtitle="Lists of active and blocked users"
                    headers={["Employee Id", "Name", "Phone", "Permission", "Section",
                        "Status", "Update", "Action", "Action"]}
                    values={this.renderList()}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users.results,
        isAuthenticated: state.fbAuth.isUserAuthenticated
    };
};
export default connect(mapStateToProps, {fetchUsers})(UsersList);