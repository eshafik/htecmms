import React from 'react';
import MaterialTable from 'material-table';
import Spinner from "../../components/Spinner";


class DataTable extends React.Component{

    renderContent = () =>{
        const columns=[
            { title: 'Section', field: 'section_name'},
            { title: 'Machine', field: 'machine_name'},
            { title: 'Status', field: 'status'},
            { title: 'Date', field: 'date'},
            { title: 'Start Time', field: 'start_at'},
            { title: 'End Time', field: 'end_at'},
            { title: 'Duration', field: 'duration'},
        ];
        if (this.props.data.records===undefined && !this.props.isSubmit){
            return <div className="text-center">No Data Available</div>
        }
        if (this.props.data.records===undefined && this.props.isSubmit){
            return (
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <Spinner/>
                        </div>
                    </div>
                </div>
            )
        }
        const data = this.props.data;
        const title = `Total On Time: ${data.total_on_time} minutes, Total Off Time: ${data.total_off_time} minutes, Utilization: ${data.utilization}%`
        return (
            <MaterialTable
                title={title}
                columns={columns}
                data={this.props.data.records}
                options={{
                    exportButton: true,
                    exportAllData:true,
                    paging: true,
                    pageSize: 10,
                    pageSizeOptions: [10, 20, 50, 100],
                    paginationType: "stepped",
                    // padding: 'dense',
                }}
            />
        )
    }


    render() {
        return(
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

export default DataTable;