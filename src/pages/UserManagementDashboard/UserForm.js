import React from 'react';
import {Field, reduxForm} from "redux-form";


class UserForm extends React.Component{

    renderError(meta){
        if (meta.touched && meta.error){
            return (
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            )
        }
    }
    renderUserGroup = ({input, label, meta}) =>{
        const className = `form-group ${meta.error && meta.touched ? "has-error has-feedback": "has-feedback"}`;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className={className}>
                        <label>{label}</label>
                        <select {...input} className="form-control">
                            <option disabled value=""> -- select an option -- </option>
                            {this.props.groups.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>
                        {this.renderError(meta)}
                    </div>
                </div>
            </div>
        );
    }

    renderSection = ({input, label, meta}) =>{
        const className = `form-group ${meta.error && meta.touched ? "has-error has-feedback": "has-feedback"}`;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className={className}>
                        <label>{label}</label>
                        <select {...input} className="form-control">
                            <option disabled value=""> -- select an option -- </option>
                            {this.props.sections.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select>
                        {this.renderError(meta)}
                    </div>
                </div>
            </div>
        );
    }

    renderInput = ({input, label, type, meta}) => {
        const className = `form-group ${meta.error && meta.touched ? "has-error has-feedback": "has-feedback"}`;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className={className}>
                        <label>{label}</label>
                        {this.props.is_update && label==="Phone"?
                            <input {...input} className="form-control" type={type} disabled/>
                            : <input {...input} className="form-control" type={type} />}
                        {/*<input {...input} className="form-control" type={type} disabled/>*/}
                        {this.renderError(meta)}
                    </div>
                </div>
            </div>
        );
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        console.log("form values: ", formValues);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Edit Profile</h4>
                            </div>
                            <div className="card-body">
                                <form
                                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                                >

                                    <Field
                                        name="username"
                                        component={this.renderInput}
                                        label="Phone"
                                        type="text"
                                    />
                                    <Field
                                        name="name"
                                        component={this.renderInput}
                                        label="Name"
                                        type="text"
                                    />
                                    <Field
                                        name="employee_id"
                                        component={this.renderInput}
                                        label="Employee ID"
                                        type="text"
                                    />
                                    <Field
                                        name="user_group"
                                        component={this.renderUserGroup}
                                        label="Permission"
                                        type="select"
                                    />
                                    <Field
                                        name="section"
                                        component={this.renderSection}
                                        label="Section"
                                        type="select"
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
        errors.username = 'You must entry a phone number';
    }
    if(!formValues.name){
        errors.name = 'You must entry a name';
    }
    if(!formValues.employee_id){
        errors.employee_id = 'You must entry a employee id';
    }
    if(!formValues.user_group){
        errors.user_group = 'You must select user permission group';
    }
    if(!formValues.section){
        errors.section = 'You must select user section';
    }
    return errors
};

export default reduxForm({
    form: "UserForm",
    validate: validate
})(UserForm);
