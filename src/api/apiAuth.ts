import axios from 'axios';

const apiAuth = axios.create({
    baseURL: 'https://cellphone0103.herokuapp.com'
});
export default apiAuth;