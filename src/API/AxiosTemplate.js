import axios from "axios";

// export const API_URL = 'http://127.0.0.1:8088'
export const API_URL = 'http://localhost:8080/'
const token = localStorage.getItem('Moskvorechie')? JSON.parse(localStorage.getItem('Moskvorechie')).value : ''



export const $api = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer '+token
    },

});
