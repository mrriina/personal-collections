import {$host} from './index';
import jwt_decode from 'jwt-decode';

export const registration = async (name, email, password) => {
    const {data} = await $host.post('api/user/registration', {name, email, password})
    sessionStorage.setItem('tokenUser', data.token)
    sessionStorage.setItem('userId', data.user.id)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    sessionStorage.setItem('tokenUser', data.token)
    sessionStorage.setItem('userId', data.user.id)
    return data;
}

export const getUser = async (id) => {
    try {
        const {data} = await $host.get(`api/user/getuser/${id}`)
        return data;
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}