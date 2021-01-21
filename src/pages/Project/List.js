import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import history from "../../history";

import {fetchStreams} from "../../store/actions/stream";
import Table from "../../components/Table";
import DataTable from "../Machines/DataTable";

class List extends React.Component{
    // componentDidMount() {
    //     this.props.fetchStreams();
    // }

    renderList(){

        return  this.props.streams.map((stream, index) => {
            return(
                <tr key={index}>
                    <td>{stream.id}</td>
                    <td>{stream.title}</td>
                    <td>{stream.description}</td>
                    <td><Link to={`/streams/edit/${stream.id}`} className="btn btn-primary">Edit</Link></td>
                    <td><Link to={`/streams/delete/${stream.id}`} className="btn btn-danger">Delete</Link></td>
                </tr>
            )
        });
    };

    render() {
        if (! this.props.isAuthenticated){
            return <Redirect to="/phone-login" />;
        }
        // if (!this.props.streams){
        //     return <div>Loading</div>
        // }

        return(
            <React.Fragment>
                <DataTable/>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {streams: Object.values(state.streams.results),
            isAuthenticated: state.fbAuth.isUserAuthenticated};
};
export default connect(mapStateToProps, {fetchStreams})(List);