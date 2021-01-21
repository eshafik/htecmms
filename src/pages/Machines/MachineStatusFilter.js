import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import MomentUtils from '@date-io/moment';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import Spinner from "../../components/Spinner";
import {getMachines, getSections} from "../../store/actions/company";
import {notify_error} from "../../components/Notify";

class MachineStatusFilter extends React.Component {
    state = {
        // value: new Date().toISOString(),
        start_date: null,
        start_time: null,
        end_date: null,
        end_time: null,
        section: null,
        machines: null,
        machineList: null,
        shift: null
    }

    componentDidMount() {
        this.props.getSections();
    }

    onSectionSelection = (e) => {
        e.preventDefault();
        let sectionId = parseInt(e.target.value);
        // let sectionIds = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        // let machineList = this.props.sections.filter((section) => sectionIds.includes(section.id));
        let machineList = this.props.sections.filter((section) => section.id === sectionId);
        this.setState({section: sectionId, machineList: machineList});
    }
    onMachineSelection = (e) => {
        e.preventDefault();
        let machineIds = Array.from(e.target.selectedOptions, option => parseInt(option.value));
        this.setState({machines: machineIds})
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        if (!this.state.start_date || !this.state.end_date){
            notify_error("You have to select date range!")
            return null;
        }
        if (!this.state.start_time || !this.state.end_time){
            notify_error("You have to select time!")
            return null;
        }
        if (!this.state.section){
            notify_error("You have to select section!")
            return null;
        }
        let queryString = "";
        if (this.state.section) {
            queryString = queryString + "&section=" + this.state.section;
        }
        if (this.state.start_date) {
            queryString = queryString + "&from=" + this.state.start_date.toISOString().split("T")[0];
            if (this.state.start_time) {
                queryString = queryString + "T" + this.state.start_time.hour() + ":" + this.state.start_time.minute() + ":00"
            }
        }
        if (this.state.end_date) {
            queryString = queryString + "&to=" + this.state.end_date.toISOString().split("T")[0];
            if(this.state.end_time){
                queryString = queryString + "T" + this.state.end_time.hour() + ":" + this.state.end_time.minute() + ":00"
            }
        }
        if (this.state.machines) {
            queryString = queryString + "&machines=" + this.state.machines.join(",");
        }
        this.props.onFilter(queryString);
        console.log("query string: query string", queryString.replace("?&", "?"));

    }
    onClearSubmit = (e) => {
        e.preventDefault();
        this.setState({
            start_date: null,
            start_time: null,
            end_date: null,
            end_time: null,
            section: null,
            machines: null,
            machineList: null,
            shift: null,
        })
    }

    render() {
        if (!this.props.sections) {
            return(
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <Spinner/>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Add Filter</h4>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row">
                                <div className="col-md-3 pr-3">
                                    <div className="form-group">
                                        <label>Section</label>
                                        <select className="form-control" onChange={this.onSectionSelection}>
                                            <option value="100"> -- All --</option>
                                            {this.props.sections.map(item => {
                                                if (item.name !== "All") {
                                                    return <option key={item.id} value={item.id}>{item.name}</option>
                                                }
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-2 pl-1">
                                    <div className="form-group">
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Select Date From"
                                                format="YYYY-MM-DD"
                                                value={this.state.start_date}
                                                onChange={(date) => this.setState({start_date: date})}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                                <div className="col-md-2 pl-1">
                                    <div className="form-group">
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker"
                                                label="Select Time From"
                                                value={this.state.start_time}
                                                onChange={(time) => this.setState({start_time: time})}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                                <div className="col-md-2 pr-1">
                                    <div className="form-group">
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog"
                                                label="Select Date To"
                                                format="YYYY-MM-DD"
                                                value={this.state.end_date}
                                                onChange={(date) => this.setState({end_date: date})}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>

                                <div className="col-md-2 pl-1">
                                    <div className="form-group">
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker"
                                                label="Select Time To"
                                                value={this.state.end_time}
                                                onChange={(time) => this.setState({end_time: time})}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 pl-1">
                                    <div className="form-group">
                                        <label>Machine</label>
                                        <select multiple className="form-control" onChange={this.onMachineSelection}>
                                            <option disabled value=""> -- select a section --</option>
                                            {this.state.machineList ?
                                                this.state.machineList[0].machines.map(item => <option
                                                    key={item.machine_no} value={item.machine_no}>{item.name}</option>)
                                                : null
                                            }
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col-md-4 pr-1">
                                    <button
                                        type="submit"
                                        className="btn btn-warning btn-fill pull-left mr-2"
                                        onClick={e => this.onFormSubmit(e)}
                                    >
                                        Apply Filter
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-danger btn-fill pull-left mr-2"
                                        onClick={e => this.onClearSubmit(e)}
                                    >
                                        Clear Date
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.fbAuth.isUserAuthenticated,
        machines: state.company.machines,
        sections: state.company.sections
    };
};
export default connect(mapStateToProps, {getMachines, getSections})(MachineStatusFilter);