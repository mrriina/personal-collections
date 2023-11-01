import axios from 'axios';

console.log('process.env.REACT_APP_API_URL==', process.env.REACT_APP_API_URL);

const $host = axios.create({
    baseURL: 'http://localhost:5000/'
    // baseURL: process.env.REACT_APP_API_URL
})


const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$host.interceptors.request.use(authInterceptor)

export {$host}