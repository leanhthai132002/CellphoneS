import axios from 'axios';

const apiAuth = axios.create({
    baseURL: 'http://localhost:8000'
});
export default apiAuth;