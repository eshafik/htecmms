import history from "../../history";

import * as actionTypes from "./type"
import streams from "../../api/stream";
import {notify_success} from "../../components/Notify";

export const createStream = formValues => async (dispatch, getState) => {
    const response = await streams.post('/streams', {...formValues});
    if (response.status === 201) {
        notify_success("Stream Creation Succeed!");
    }
    dispatch({type: actionTypes.CREATE_STREAM, payload: response.data});
    history.push("/");
};

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');
    dispatch({type: actionTypes.FETCH_STREAMS, payload: response.data});
};

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({type: actionTypes.FETCH_STREAM, payload: response.data});
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({type: actionTypes.EDIT_STREAM, payload: response.data});
    notify_success("Updated Successfully!")
    history.push("/");
};

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`);
    dispatch({type: actionTypes.DELETE_STREAM, payload: id});
    history.push("/");
    notify_success("Stream has been deleted successfully!")
};