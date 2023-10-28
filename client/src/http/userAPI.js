import {$host} from './index';

// export const registration = async (email, password, name) => {
//     try {
//         const {data} = await $host.post('api/user/registration', {email, password, name})
//         sessionStorage.setItem('tokenUser', data.token)
//         sessionStorage.setItem('userId', data.user.id)
//         // return jwt_decode(data.token)
//     } catch (e) {
//         console.log('Error: ', e);
//     }
// }