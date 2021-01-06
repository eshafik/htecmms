import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import Spinner from "../../components/Spinner";
import {getMachines} from "../../store/actions/company";

import Table from "../../components/Table";

class MachineList extends React.Component {
    state = {
        // value: new Date().toISOString(),
        start_date: null,
        end_date: null,
        section: null,
        machine: null,
        shift: null
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        console.log("Start Date: ", this.state.start_date.toISOString());
        console.log("End Date: ", this.state.end_date.toISOString());
    }
    onClearSubmit = (e) => {
        e.preventDefault();
        this.setState({
            start_date: null,
            end_date: null,
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
        // if (!this.props.users) {
        //     return <Spinner/>
        // }
        console.log("Machine Component....................!");

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
                                            <div className="col-md-4 pr-1">
                                                <div className="form-group">
                                                    <label>Section</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={this.state.section}
                                                        onChange={(e => {e.preventDefault();
                                                        this.setState({section:e.target.value})})
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 px-1">
                                                <div className="form-group">
                                                    <label>Machine</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={this.state.machine}
                                                        onChange={(e => {e.preventDefault();
                                                            this.setState({machine:e.target.value})})
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 pl-1">
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Shift</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={this.state.shift}
                                                        onChange={(e => {e.preventDefault();
                                                            this.setState({shift:e.target.value})})
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 pr-1">
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

                                            <div className="col-md-4 px-1">
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
        machines: state.company.machines
    };
};
export default connect(mapStateToProps)(MachineList);