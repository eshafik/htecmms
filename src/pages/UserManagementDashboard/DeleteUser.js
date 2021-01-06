import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Modal} from 'react-bootstrap';

import {fetchUser, deleteUser} from "../../store/actions/user";
import history from "../../history";

class DeleteUser extends React.Component{

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    onSubmit = () => {
        this.props.deleteUser(this.props.match.params.id);
    }

    renderActions () {
        return (
            <React.Fragment>
                <Link to="/users" className="btn btn-secondary">Cancel</Link>
                <button
                    className="btn btn-danger"
                    onClick={this.onSubmit}
                >Delete</button>
            </React.Fragment>
        );
    }

    renderContent() {
        if(!this.props.user){
            return "Are you sure you want to delete?"
        }
        return `Are you sure you want to delete : ${this.props.user.name}`
    }

    render() {
        return(
            <Modal show={true} onHide={()=>history.push("/users")}>
                <Modal.Header>Delete User</Modal.Header>
                <Modal.Body>{this.renderContent()}</Modal.Body>
                <Modal.Footer>{this.renderActions()}</Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {user: state.users.user}
};

export default connect(mapStateToProps, {fetchUser, deleteUser})(DeleteUser);