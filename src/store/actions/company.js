import history from "../../history";

import * as actionTypes from "./type"
import machineStatusManagement from "../../api/machineStatusManagement";
import {refreshToken} from "./firebaseAuth";
import {notify_error} from "../../components/Notify";


export const getSections = () => async dispatch => {
    try{
        const response = await machineStatusManagement.get('/company/sections', {
            headers: {
                'Authorization': "jwt " + localStorage.getItem("idToken")
            },
        });
        console.log("section result: ", response.data);
        dispatch({type: actionTypes.FETCH_SECTIONS, payload: response.data});
    }catch (e) {
        if (e.response && e.response.status===401) {
            refreshToken().then(async function () {
                const response = await machineStatusManagement.get('/company/sections', {
                    headers: {
                        'Authorization': "jwt " + localStorage.getItem("idToken")
                    },
                });
                dispatch({type: actionTypes.FETCH_SECTIONS, payload: response.data});
                }
            ).catch(function (e) {
                notify_error("Network Error!");
            })
        }

    }

};

export const getMachines = () => async dispatch => {
    try{
        const response = await machineStatusManagement.get('/company/machines', {
            headers: {
                'Authorization': "jwt " + localStorage.getItem("idToken")
            },
        });
        dispatch({type: actionTypes.FETCH_MACHINES, payload: response.data});
    }catch (e) {
        if (e.response && e.response.status===401) {
            refreshToken().then(async function () {
                const response = await machineStatusManagement.get('/company/machines', {
                    headers: {
                        'Authorization': "jwt " + localStorage.getItem("idToken")
                    },
                });
                dispatch({type: actionTypes.FETCH_MACHINES, payload: response.data});
                }
            ).catch(function (e) {
                notify_error("Network Error!");
            })
        }

    }

};
