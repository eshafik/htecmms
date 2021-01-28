import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {Modal} from 'react-bootstrap';

// import {userLogOut} from "../store/actions/auth";
import {userLogOutWithPhone} from "../store/actions/firebaseAuth";
import history from "../history";

class Logout extends React.Component{

    onSubmit = () => {
        this.props.userLogOutWithPhone();
        history.push("/htecmms");
    }

    renderActions () {
        return (
            <React.Fragment>
                <Link to="/" className="btn btn-secondary">Cancel</Link>
                <button
                    className="btn btn-danger"
                    onClick={this.onSubmit}
                >Logout</button>
            </React.Fragment>
        );
    }

    renderContent() {
        return `Are you sure you want to Logout?`

    }

    render() {
        if (!this.props.isAuthenticated){
            return <Redirect to="/htecmms/phone-login"/>;
        }
        return(
            <Modal.Dialog >
                <Modal.Header closeButton>Logout</Modal.Header>
                <Modal.Body>{this.renderContent()}</Modal.Body>
                <Modal.Footer>{this.renderActions()}</Modal.Footer>
            </Modal.Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {isAuthenticated: state.fbAuth.isUserAuthenticated}
}


export default connect(mapStateToProps, {userLogOutWithPhone})(Logout);