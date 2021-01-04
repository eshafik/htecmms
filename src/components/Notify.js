import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const notify_success = (message) =>{
    toast.success(`${message}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000})
}

export const notify_error = (message) =>{
    toast.error(`${message}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000})
}

export const notify_info = (message) =>{
    toast.info(`${message}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000})
}