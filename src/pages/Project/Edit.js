import React from 'react';
import {connect } from 'react-redux';
import _ from 'lodash';

import {fetchStream, editStream} from "../../store/actions/stream";
import ProjectForm from "./ProjectForm";

class Edit extends React.Component{
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        console.log("edit form.. stream: ", this.props.stream);
        if (!this.props.stream){
            return <div>Loading</div>
        }
        const initialValues = _.pick(this.props.stream, "title", "description");
        console.log("initial values: ", initialValues);
        return(
            <ProjectForm
                onSubmit={this.onSubmit}
                // initialize the field which will be populated
                initialValues = {_.pick(this.props.stream, "title", "description")}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log("streams: ", state.streams.results, );
    console.log("id: ", ownProps.match.params.id);
    console.log("result: ", state.streams.results[ownProps.match.params.id]);
    return {stream: state.streams.results[ownProps.match.params.id]}
};
export default connect(mapStateToProps, {fetchStream, editStream})(Edit);