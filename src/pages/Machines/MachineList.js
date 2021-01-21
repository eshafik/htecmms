import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import MomentUtils  from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import MachineStatusFilter from "./MachineStatusFilter";

import Spinner from "../../components/Spinner";
import {getMachines, getSections} from "../../store/actions/company";

import Table from "../../components/Table";

class MachineList extends React.Component {

    render() {
        if (!this.props.isAuthenticated) {
            return <Redirect to="/phone-login"/>;
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <MachineStatusFilter/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.fbAuth.isUserAuthenticated,
        // machines: state.company.machines,
        // sections: state.company.sections
    };
};
export default connect(mapStateToProps)(MachineList);