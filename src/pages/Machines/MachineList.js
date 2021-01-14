import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import Spinner from "../../components/Spinner";
import {getMachines, getSections} from "../../store/actions/company";

import Table from "../../components/Table";

class MachineList extends React.Component {
    state = {
        // value: new Date().toISOString(),
        start_date: null,
        end_date: null,
        section: null,
        machine: null,
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
        this.setState({machine: machineIds})
    }
    onShiftSelection = (e) => {
        e.preventDefault();
        this.setState({shift: e.target.value})
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        let queryString = "?";
        if(this.state.section){
            queryString = queryString + "&section=" + this.state.section;
        }
        if(this.state.shift){
            queryString = queryString + "&shift=" + this.state.shift;
        }
        if(this.state.start_date){
            queryString = queryString + "&from=" + this.state.start_date.toISOString().split("T")[0];
        }
        if(this.state.end_date){
            queryString = queryString + "&to=" + this.state.end_date.toISOString().split("T")[0];
        }
        if(this.state.machine){
            queryString = queryString + "&machine=" + this.state.machine.join(",");
        }
        console.log("query string: query string", queryString.replace("?&", "?"));
        // console.log("section: ", this.state.section);
        // console.log("shift: ", this.state.shift);
        // console.log("machine: ", this.state.machine);
        // console.log("Start Date: ", this.state.start_date.toISOString());
        // console.log("End Date: ", this.state.end_date.toISOString());
    }
    onClearSubmit = (e) => {
        e.preventDefault();
        this.setState({
            start_date: null,
            end_date: null,
            section: null,
            machine: null,
            machineList: null,
            shift: null
        })
    }

    renderList() {
        return this.props.machines.map((user, index) => {
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
        if (!this.props.sections) {
            return <Spinner/>
        }
        console.log("on section selection: ", this.state.section);

        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Add Filter</h4>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="row">
                                            <div className="col-md-3 pr-1">
                                                <div className="form-group">
                                                    <label>Section</label>
                                                    <select className="form-control" onChange={this.onSectionSelection}>
                                                        <option value=""> -- select a section -- </option>
                                                        {this.props.sections.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3 pl-1">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Shift</label>
                                                    <select className="form-control" onChange={this.onShiftSelection}>
                                                        <option  value=""> -- select a shift -- </option>
                                                        {this.state.machineList ?
                                                            this.state.machineList[0].shifts.map(item => <option key={item.name} value={item.name}>{item.name}</option>)
                                                            :null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-3 pr-1">
                                                <div className="form-group">
                                                    <label>From</label>
                                                    <DatePicker
                                                        date={this.state.start_date}
                                                        onDateChange={(date) => this.setState({start_date: date})}
                                                        locale={enGB}
                                                    >
                                                        {({ inputProps, focused }) => (
                                                            <input
                                                                className="form-control"
                                                                {...inputProps}
                                                            />
                                                        )}
                                                    </DatePicker>
                                                </div>
                                            </div>

                                            <div className="col-md-3 px-1">
                                                <div className="form-group">
                                                    <label>To</label>
                                                    <DatePicker
                                                        date={this.state.end_date}
                                                        onDateChange={(date) => this.setState({end_date: date})}
                                                        locale={enGB}
                                                    >
                                                        {({ inputProps, focused }) => (
                                                            <input
                                                                className="form-control"
                                                                {...inputProps}
                                                            />
                                                        )}
                                                    </DatePicker>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 pl-1">
                                                <div className="form-group">
                                                    <label>Machine</label>
                                                    <select multiple className="form-control" onChange={this.onMachineSelection}>
                                                        <option disabled value=""> -- select a section -- </option>
                                                        {this.state.machineList ?
                                                            this.state.machineList[0].machines.map(item => <option key={item.machine_no} value={item.machine_no}>{item.name}</option>)
                                                            :null
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
                    </div>
                </div>
            </React.Fragment>
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
export default connect(mapStateToProps, {getMachines, getSections})(MachineList);