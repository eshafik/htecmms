import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Modal} from 'react-bootstrap';

import {fetchUser, blockUnblockUser} from "../../store/actions/user";
import history from "../../history";

class BlockUser extends React.Component{

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    onSubmit = (isBlocked) => {
        this.props.blockUnblockUser(this.props.match.params.id, isBlocked);
    }

    renderActions () {
        return (
            <React.Fragment>
                <Link to="/users" className="btn btn-secondary">Cancel</Link>
                <button
                    className="btn btn-danger"
                    onClick={()=>this.onSubmit(true)}
                >Block</button>
            </React.Fragment>
        );
    }

    renderUnblockActions () {
        return (
            <React.Fragment>
                <Link to="/users" className="btn btn-secondary">Cancel</Link>
                <button
                    className="btn btn-danger"
                    onClick={()=>this.onSubmit(false)}
                >Unblock</button>
            </React.Fragment>
        );
    }

    renderContent() {
        if(!this.props.user){
            return "Are you sure you want to block?"
        }
        return `Are you sure you want to block : ${this.props.user.name}`
    }
    renderUnblockContent() {
        if(!this.props.user){
            return "Are you sure you want to Unblock?"
        }
        return `Are you sure you want to Unblock: ${this.props.user.name}`
    }

    render() {
        if (!this.props.user){
            return null;
        }
        if(this.props.user.is_blocked){
            return (
                <Modal show={true} onHide={()=>history.push("/users")}>
                    <Modal.Header>Unblock User</Modal.Header>
                    <Modal.Body>{this.renderUnblockContent()}</Modal.Body>
                    <Modal.Footer>{this.renderUnblockActions()}</Modal.Footer>
                </Modal>
            )
        }
        return(
            <Modal show={true} onHide={()=>history.push("/users")}>
                <Modal.Header>Block User</Modal.Header>
                <Modal.Body>{this.renderContent()}</Modal.Body>
                <Modal.Footer>{this.renderActions()}</Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {user: state.users.user}
};

export default connect(mapStateToProps, {fetchUser, blockUnblockUser})(BlockUser);