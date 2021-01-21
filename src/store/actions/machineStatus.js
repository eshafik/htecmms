import * as actionTypes from "./type"
import machineStatusManagement from "../../api/machineStatusManagement";
import {refreshToken} from "./firebaseAuth";
import {notify_error} from "../../components/Notify";


export const getLiveStatus = () => async dispatch => {
    try{
        const response = await machineStatusManagement.get('/machine/status', {
            headers: {
                'Authorization': "jwt " + localStorage.getItem("idToken")
            },
        });
        dispatch({type: actionTypes.LIVE_STATUS, payload: response.data});
    }catch (e) {
        if (e.response && e.response.status===401) {
            refreshToken().then(async function () {
                    const response = await machineStatusManagement.get('/machine/status', {
                        headers: {
                            'Authorization': "jwt " + localStorage.getItem("idToken")
                        },
                    });
                    dispatch({type: actionTypes.LIVE_STATUS, payload: response.data});
                }
            ).catch(function (e) {
                notify_error("Network Error!");
            })
        }

    }

};