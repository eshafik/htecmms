import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";

import MachineStatusFilter from "./MachineStatusFilter";

import Spinner from "../../components/Spinner";
import {getFilteredData} from "../../store/actions/machineStatus";
import DataTable from "./DataTable";

class MachineList extends React.Component {

    onFilter = queryParams => {
        this.props.getFilteredData(queryParams);
    }
    handleIsSubmit = (isSubmit) =>{
        this.setState({isSubmit: isSubmit})
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/phone-login"/>;
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <MachineStatusFilter onFilter={this.onFilter}/>
                    </div>
                    <div className="row">
                        <DataTable data={this.props.data} isSubmit={this.state.isSubmit} handleIsSubmit={this.handleIsSubmit}/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.fbAuth.isUserAuthenticated,
        data: state.machine.filtered_data
    };
};
export default connect(mapStateToProps, {getFilteredData})(MachineList);