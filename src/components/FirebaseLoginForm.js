import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Spinner} from "react-bootstrap";

import history from "../history";
// import {userLogin} from "../store/actions/auth";
import {userLoginWithPhone} from "../store/actions/firebaseAuth";
import styles from './LoginForm.module.css';
import firebase from "../firebaseConfig";
import {notify_info, notify_error} from "./Notify";
import {checkUser} from "../helper";


class FirebaseLoginForm extends React.Component{

    state = {
        has_submit: false,
        has_success: false,
        has_otp_submit: true
    }

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

    renderButton = (buttonText) => {
        if (!this.state.has_submit || !this.state.has_otp_submit){
            return (<button
                className="btn btn-info btn-fill pull-right"
                type="submit"
            >
                {buttonText}
            </button>)
        }
        return (
            <button
                className="btn btn-info btn-fill pull-right"
                disabled
            >
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Verifying....
            </button>
        )
    }

    renderContent = () =>{
        if (!this.state.has_success){
            return (
                <form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                >
                    <div id="recaptcha-container"></div>

                    <Field
                        name="username"
                        component={this.renderInput}
                        label="Phone Number"
                        type="text"
                    />
                    {this.renderButton("Verify")}
                </form>
            )
        }
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onOTPSubmit)}
            >

                <Field
                    name="otp"
                    component={this.renderInput}
                    label="OTP"
                    type="number"
                />
                {this.renderButton("Submit")}
            </form>
        )
    }

    settUpRecaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function (response) {
                    console.log("Captcha Resolved");
                },
                defaultCountry: "BD",
            }
        );
    };

    onSubmit = (formValues) => {
        this.setState({has_submit:true});
        const phoneNumber = "+88" + formValues.username;
        const userStatus = checkUser(phoneNumber);
        userStatus.then((result)=> {
            if (!result.is_exists){
                notify_error("User Doesn't Exists!");
                this.setState({has_submit:false});
                return null;
            }
            localStorage.setItem('name', result.name);
            localStorage.setItem('group', result.group);
            this.settUpRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    console.log("message has been sent!");
                    window.confirmationResult = confirmationResult;
                    // history.push('/otp/');
                    notify_info("OTP has been sent!");
                    this.setState({has_success:true, has_otp_submit: false})
                }).catch((error) => {
                notify_error("Error! Try again.");
            });

        })
            .catch((error)=>{
                notify_error("Network Error!");
                console.log("Error: ", error);
            })

    }

    onOTPSubmit = (formValues) => {
        this.setState({has_submit:true, has_otp_submit: true})
        console.log("submitted OTP: ", formValues.otp);
        let code = formValues.otp;
        const confirmationResult = window.confirmationResult;
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            localStorage.setItem('refreshToken', user.refreshToken);
            user.getIdToken()
                .then(function(idToken) {
                    localStorage.setItem('idToken', idToken);
                })
                .catch(function(error) {
                    console.log("token error: ", error);
                    notify_error("Error! Try again.");
                });
            this.props.userLoginWithPhone();
        }).catch((error) => {
            this.setState({has_otp_submit: false});
            console.log("submition error: ", error);
            notify_error("Error! Try again.");
        });
    }

    render() {
        if (this.props.isAuthenticated){
            history.push("/htecmms");
        }
        return (
            <div className="container-fluid" id={styles.custom_form}>
                <div className="row">
                    <div className="col-md-6 align-content-md-center">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">User Login with Phone Number</h4>
                            </div>
                            <div className="card-body">
                                {this.renderContent()}
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
    if(formValues.username && formValues.username.length !== 11){
        errors.username = 'You must entry 11 digit phone number!';
    }
    return errors
};

const mapSateToProps = (state) => {
    return {isAuthenticated: state.fbAuth.isUserAuthenticated}
}


// export default reduxForm({
//     form: "LoginForm",
//     validate: validate
// })(LoginForm);
const firebaseLoginForm = reduxForm({
    form: "FLoginForm",
    validate: validate
})(FirebaseLoginForm);

export default connect(mapSateToProps, {userLoginWithPhone})(firebaseLoginForm)