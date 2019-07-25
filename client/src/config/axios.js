import Axios from 'axios';

export const axios = Axios.create({
    baseURL: 'http://localhost:3001'
})

export const headers = {
    headers: {
        "x-auth": localStorage.getItem('userAuthToken'),
        "Content-Type": "multipart/form-data"
    }
}