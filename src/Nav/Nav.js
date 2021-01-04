import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import {connect} from 'react-redux';

// import {userLoginWithPhone, userLogOut} from "../store/actions/auth";
import {userLoginWithPhone, userLogOutWithPhone} from "../store/actions/firebaseAuth";
import List from "../pages/Project/List";
import Create from "../pages/Project/Create";
import Edit from "../pages/Project/Edit";
import Delete from "../pages/Project/Delete";
import Details from "../pages/Project/Details";
import LoginForm from "../components/LoginForm";
import Logout from "../components/Logout";

class Nav extends React.Component {

    state = {
        isToggled: false
    }

    onToggleHandler = () => {
        this.setState({
            isToggled: !this.state.isToggled
        });
    }

    renderLogin() {
        if (this.props.isAuthenticated) {
            return (
                <Link className="nav-link" to="/logout">
                    <span className="no-icon">Log out</span>
                </Link>
            )
        } else {
            return (
                <Link className="nav-link" to="/phone-login">
                    <span className="no-icon">Login</span>
                </Link>
            )
        }
    }

    render() {
        const {isToggled} = this.state;
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg ">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/#"> Dashboard </Link>
                        <button
                            onClick={this.onToggleHandler}
                            className={'navbar-toggler navbar-toggler-right' + (isToggled ? ' toggled' : '')}
                            type="button" data-toggle="collapse"
                            aria-controls="navigation-index"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-bar burger-lines"/>
                            <span className="navbar-toggler-bar burger-lines"/>
                            <span className="navbar-toggler-bar burger-lines"/>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navigation">
                            {/*<ul className="nav navbar-nav mr-auto">*/}
                            {/*    <li className="nav-item">*/}
                            {/*        <Link to="/#" className="nav-link" data-toggle="dropdown">*/}
                            {/*            <i className="nc-icon nc-palette"/>*/}
                            {/*            <span className="d-lg-none">Dashboard</span>*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*    <li className="dropdown nav-item">*/}
                            {/*        <Link to="/#" className="dropdown-toggle nav-link" data-toggle="dropdown">*/}
                            {/*            <i className="nc-icon nc-planet"/>*/}
                            {/*            <span className="notification">5</span>*/}
                            {/*            <span className="d-lg-none">Notification</span>*/}
                            {/*        </Link>*/}
                            {/*        <ul className="dropdown-menu">*/}
                            {/*            <Link className="dropdown-item" to="/#">Notification 1</Link>*/}
                            {/*            <Link className="dropdown-item" to="/#">Notification 2</Link>*/}
                            {/*            <Link className="dropdown-item" to="/#">Notification 3</Link>*/}
                            {/*            <Link className="dropdown-item" to="/#">Notification 4</Link>*/}
                            {/*            <Link className="dropdown-item" to="/#">Another notification</Link>*/}
                            {/*        </ul>*/}
                            {/*    </li>*/}
                            {/*    <li className="nav-item">*/}
                            {/*        <Link to="/#" className="nav-link">*/}
                            {/*            <i className="nc-icon nc-zoom-split"/>*/}
                            {/*            <span className="d-lg-block">&nbsp;Search</span>*/}
                            {/*        </Link>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/shafik">
                                        {this.props.isUserAuthenticated ?
                                            <span className="no-icon">Account</span> :
                                            <span className="no-icon">{localStorage.getItem('name')}</span>}
                                    </Link>
                                </li>
                                {/*<li className="nav-item dropdown">*/}
                                {/*    <Link className="nav-link dropdown-toggle" to="/#"*/}
                                {/*       id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"*/}
                                {/*       aria-expanded="false">*/}
                                {/*        <span className="no-icon">Dropdown</span>*/}
                                {/*    </Link>*/}
                                {/*    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">*/}
                                {/*        <Link className="dropdown-item" to="/#">Action</Link>*/}
                                {/*        <Link className="dropdown-item" to="/#">Another action</Link>*/}
                                {/*        <Link className="dropdown-item" to="/#">Something</Link>*/}
                                {/*        <Link className="dropdown-item" to="/#">Something else here</Link>*/}
                                {/*        <div className="divider"/>*/}
                                {/*        <Link className="dropdown-item" to="/#">Separated link</Link>*/}
                                {/*    </div>*/}
                                {/*</li>*/}
                                <li className="nav-item">
                                    {this.renderLogin()}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {isAuthenticated: state.fbAuth.isUserAuthenticated}
}

export default connect(mapStateToProps, {userLoginWithPhone, userLogOutWithPhone})(Nav);