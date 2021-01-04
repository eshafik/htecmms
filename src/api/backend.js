import axios from 'axios';


export default axios.create({
    baseURL: `${process.env.REACT_APP_MY_API_URL}/api/v1`,
})