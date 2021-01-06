import React from 'react';


const Table = props => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card strpied-tabled-with-hover">
                                        <div className="card-header ">
                                            <h4 className="card-title">{props.title}</h4>
                                            <p className="card-category">{props.subtitle}</p>
                                        </div>
                                        <div className="card-body table-full-width table-responsive">
                                            <table className="table table-hover table-striped">
                                                <thead>
                                                    <tr>
                                                        {props.headers.map((header, index) => <th key={index}>{header}</th>)}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {props.values}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
