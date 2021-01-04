import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Modal} from 'react-bootstrap';

import {fetchStream, deleteStream} from "../../store/actions/stream";
// import Modal from "../../Modal/Modal";
import history from "../../history";

class Delete extends React.Component{

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = () => {
        console.log("stream: ", this.props.stream);
        this.props.deleteStream(this.props.match.params.id);
    }

    renderActions () {
        return (
            <React.Fragment>
                <button
                    className="btn btn-danger"
                    onClick={this.onSubmit}
                >Delete</button>
                <Link to="/" className="btn btn-secondary">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if(!this.props.stream){
            return "Are you sure you want to delete?"
        }
        return `Are you sure you want to delete this title: ${this.props.stream.title}`

    }

    render() {
        return(
            <Modal show={true} onHide={()=>history.push("/")}>
                <Modal.Header>Delete Stream</Modal.Header>
                <Modal.Body>{this.renderContent()}</Modal.Body>
                <Modal.Footer>{this.renderActions()}</Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return {stream: state.streams.results[ownProps.match.params.id]}
};

export default connect(mapStateToProps, {fetchStream, deleteStream})(Delete);