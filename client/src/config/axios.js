import Axios from 'axios';

export const axios = Axios.create({
    baseURL: 'http://localhost:3001'
})

export const headers = {
    headers: {
        "Content-Type": "multipart/form-data",
        "x-auth": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDM3ZGJlNjdhN2M0MzEyYThmNzc0YjYiLCJjcmVhdGVkQXQiOjE1NjM5NDIwMzg5ODYsImlhdCI6MTU2Mzk0MjAzOH0.c5SgXtJYm77z_qEiUAdiATCLDU9C5_XheeXDsF9agjM"
    }
}