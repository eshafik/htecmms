import React from 'react';
import {connect} from 'react-redux';

import ProjectForm from "./ProjectForm";
import {createStream} from "../../store/actions/stream";

class Create extends React.Component{
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }
    render() {
        return(
            <React.Fragment>
                <ProjectForm onSubmit={this.onSubmit}/>
            </React.Fragment>
        )
    }
}

export default connect(null, {createStream})(Create);