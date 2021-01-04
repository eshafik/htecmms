import axios from 'axios';


export default axios.create({
    baseURL: `${process.env.REACT_APP_REFRESH_TOKEN_URL}`,
})