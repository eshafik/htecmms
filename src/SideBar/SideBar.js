import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';


class SideBar extends React.Component{
    renderSideBarMenu(){
        if(!this.props.isAuthenticated){
            return null;
        }
        return(
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/#" onClick={ (e) => e.preventDefault() }>
                        <i className="nc-icon nc-chart-pie-35"/>
                        <p>Dashboard</p>
                    </Link>
                </li>
                {localStorage.getItem('group') && localStorage.getItem('group') === 'DEV-ADMIN' ?
                    <li className="nav-item">
                        <Link className="nav-link" to="/htecmms/users">
                            <i className="nc-icon nc-circle-09"/>
                            <p>Users Management</p>
                        </Link>
                    </li>
                    : null
                }

                <li className="nav-item">
                    <Link className="nav-link" to="/htecmms/machines/data">
                        <i className="nc-icon nc-notes"/>
                        <p>Data</p>
                    </Link>
                </li>
            </ul>
        )
    }
    render() {
        return(
            <div className="sidebar" data-color="grey">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <Link to="/#" className="simple-text">
                            HTEC
                        </Link>
                    </div>
                    {this.renderSideBarMenu()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {isAuthenticated: state.fbAuth.isUserAuthenticated}
}

export default connect(mapStateToProps)(SideBar);