import axios from 'axios';


export default axios.create({
    baseURL: "https://htecmms.herokuapp.com/api/v1"
})