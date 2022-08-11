import axios from "axios";

const instance = axios.create({
    baseURL: "https://cellphone0103.herokuapp.com"
})

export default instance;