// src/components/basic.table.js
import React from "react";
import {connect} from 'react-redux';
import MaterialTable from 'material-table';

import {getLiveStatus} from "../../store/actions/machineStatus";

import Spinner from "../../components/Spinner";


class MachineStatusTable extends React.Component{

    componentDidMount() {
        this.props.getLiveStatus();
        setInterval(this.props.getLiveStatus(), 180*1000);
    }

    renderStatus = (rowData) => {
        if (rowData.status==="on"){
            return (<button type="button" className="btn btn-success">{rowData.status}</button>)
        }
        return(
            <button type="button" className="btn btn-danger">{rowData.status}</button>
        )
    }

    renderNetworkStatus = (rowData) => {
        if (rowData.network_status==="working"){
            return (<button type="button" className="btn btn-success">{rowData.network_status}</button>)
        }
        return(
            <button type="button" className="btn btn-danger">Network Error</button>
        )
    }

    renderContent = () =>{
        const columns=[
            { title: 'Section', field: 'section_name'},
            { title: 'Machine', field: 'machine_name'},
            { title: 'Status', field: 'status', render: rowData => this.renderStatus(rowData)},
            { title: 'Last Update', field: 'last_update'},
            { title: 'Network', field: 'network_status', render: rowData => this.renderNetworkStatus(rowData)},
        ];
        if (this.props.data===undefined || this.props.data.length===0 ){
            return <Spinner/>
        }
        return (
            <MaterialTable
                title="Live Machine Status"
                columns={columns}
                data={this.props.data}
                options={{
                    exportButton: true,
                    paging: true,
                    // pageSize: 10,
                    // pageSizeOptions: [10, 20, 50, 100],
                    paginationType: "stepped"
                }}
            />
            )

    }

    render() {
        return (
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {data: state.machine.live_data}
}

export default connect(mapStateToProps, {getLiveStatus})(MachineStatusTable);