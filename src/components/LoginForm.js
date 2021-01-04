import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import history from "../history";

import {userLogin} from "../store/actions/auth";
import styles from './LoginForm.module.css';


class LoginForm extends React.Component{

    renderError(meta){
        if (meta.touched && meta.error){
            return (
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, type, meta}) => {
        const className = `form-group ${meta.error && meta.touched ? "has-error has-feedback": "has-feedback"}`;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className={className}>
                        <label>{label}</label>
                        <input {...input} className="form-control" type={type}/>
                        {this.renderError(meta)}
                    </div>
                </div>
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.userLogin(formValues);
    }

    render() {
        if (localStorage.getItem("token")){
            history.push("/");
        }
        return (
            <div className="container-fluid" id={styles.custom_form}>
                <div className="row">
                    <div className="col-md-6 align-content-md-center">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">User Login</h4>
                            </div>
                            <div className="card-body">
                                <form
                                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                                >

                                    <Field
                                        name="username"
                                        component={this.renderInput}
                                        label="Username"
                                        type="text"
                                    />
                                    <Field
                                        name="password"
                                        component={this.renderInput}
                                        label="Password"
                                        type="password"
                                    />
                                    <button
                                        className="btn btn-info btn-fill pull-right"
                                        type="submit"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const validate =  (formValues) => {
    const errors = {};
    if(!formValues.username){
        errors.username = 'You must entry your username!';
    }
    if(!formValues.password){
        errors.password = 'You must entry your password';
    }
    return errors
};


// export default reduxForm({
//     form: "LoginForm",
//     validate: validate
// })(LoginForm);
const loginForm = reduxForm({
    form: "LoginForm",
    validate: validate
})(LoginForm);

export default connect(null, {userLogin})(loginForm)