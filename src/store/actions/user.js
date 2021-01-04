import history from "../../history";

import * as actionTypes from "./type"
import streams from "../../api/stream";
import machineStatusManagement from "../../api/machineStatusManagement";
import {notify_error, notify_success} from "../../components/Notify";
import {refreshToken} from "./firebaseAuth";


export const getUserGroup = () => async (dispatch, getState) => {
    try{
        const response = await machineStatusManagement.get('/users/groups', {
            headers: {
                'Authorization': "jwt " + localStorage.getItem("idToken")
            },
        });
        dispatch({type: actionTypes.USER_GROUPS, payload: response.data});
    }catch (e) {
        if (e.response && e.response.status===401) {
            refreshToken().then(async function () {
                const response = await machineStatusManagement.get('/users/groups', {
                    headers: {
                        'Authorization': "jwt " + localStorage.getItem("idToken")
                    },
                });
                dispatch({type: actionTypes.USER_GROUPS, payload: response.data});
                }
            ).catch(function (e) {
                notify_error("Network Error!");
            })
        }

    }

};


export const createUser = formValues => async (dispatch, getState) => {
    try{
        const response = await machineStatusManagement.post('/users/', {...formValues});
        if (response.status === 201) {
            notify_success("Stream Creation Succeed!");
        }
        dispatch({type: actionTypes.CREATE_USER, payload: response.data});
        history.push("/users");
        window.location.reload();
    }catch (e) {
        if (e.response && e.response.status===401) {
            refreshToken().then(async function () {
                    const response = await machineStatusManagement.post('/users/', {...formValues});
                    if (response.status === 201) {
                        notify_success("Stream Creation Succeed!");
                    }
                    dispatch({type: actionTypes.CREATE_USER, payload: response.data});
                    history.push("/users");
                }
            ).catch(function (e) {
                notify_error("Network Error!");
            })
        }
        notify_error("Error Creating New User!");

    }
};

export const fetchUsers = () => async (dispatch, getState) => {
    console.log("fetch users Action ......................");
    try{
        let response = await machineStatusManagement.get('/users', {
            headers: {
                'Authorization': `jwt ${getState().fbAuth.idToken}`
            },
        });
        dispatch({type: actionTypes.FETCH_USERS, payload: response.data});
    }catch (e) {
            if (e.response && e.response.status===401) {
                refreshToken().then(async function () {
                    const response = await machineStatusManagement.get('/users', {
                        headers: {
                            'Authorization': "jwt " + localStorage.getItem("idToken")
                        },
                    });
                    dispatch({type: actionTypes.FETCH_USERS, payload: response.data});
                    }
                ).catch(function (e) {
                    notify_error("Network Error!");
                })
            }

    }

};

export const fetchUser = (id) => async (dispatch, getState) => {
    try{
        const response = await machineStatusManagement.get(`/users/${id}/`, {
            headers: {
                'Authorization': "jwt " + localStorage.getItem("idToken")
            },
        });
        dispatch({type: actionTypes.FETCH_USER, payload: response.data});
    }catch (e) {
        if (e.response && e.response.status===401) {
            refreshToken().then(async function () {
                const response = await machineStatusManagement.get(`/users/${id}/`, {
                    headers: {
                        'Authorization': "jwt " + localStorage.getItem("idToken")
                    },
                });
                dispatch({type: actionTypes.FETCH_USER, payload: response.data});
                }
            ).catch(function (e) {
                notify_error("Network Error!");
            })
        }

    }
};

export const editUser = (id, formValues) => async dispatch => {
    try{
        const response = await machineStatusManagement.patch(`/users/${id}/`, formValues, {
            headers: {
                'Authorization': "jwt " + localStorage.getItem("idToken")
            },
        });
        dispatch({type: actionTypes.EDIT_USER, payload: response.data});
        notify_success("Updated Successfully!")
        history.push("/users");
    }catch (e) {
        if (e.response && e.response.status===401) {
            refreshToken().then(async function () {
                const response = await machineStatusManagement.patch(`/users/${id}`, formValues, {
                    headers: {
                        'Authorization': "jwt " + localStorage.getItem("idToken")
                    },
                });
                dispatch({type: actionTypes.EDIT_USER, payload: response.data});
                notify_success("Updated Successfully!")
                history.push("/");
                }
            ).catch(function (e) {
                notify_error("Network Error!");
            })
        }

    }

};

export const blockUnblockUser = (id, isBlocked) => async dispatch => {
    try{
        const formValues = {is_blocked: isBlocked}
        await machineStatusManagement.patch(`/users/${id}/`, formValues, {
            headers: {
                'Authorization': "jwt " + localStorage.getItem("idToken")
            },
        });
        dispatch({type: actionTypes.BLOCK_UNBLOCK_USER});
        notify_success("Action Successful!");
        window.location.reload();

    }catch (e) {
        if (e.response && e.response.status===401) {
            refreshToken().then(async function () {
                const formValues = {is_blocked: isBlocked}
                await machineStatusManagement.patch(`/users/${id}/`, formValues, {
                    headers: {
                        'Authorization': "jwt " + localStorage.getItem("idToken")
                    },
                });
                dispatch({type: actionTypes.BLOCK_UNBLOCK_USER});
                notify_success("Action Successful!");
                window.location.reload();
                }
            ).catch(function (e) {
                notify_error("Network Error!");
            })
        }

    }

};