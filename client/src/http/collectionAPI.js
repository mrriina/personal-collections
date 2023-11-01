import axios from 'axios';


export const uploadCollectionFile = async (data, cloudName) => {
    // const {data} = await $host.post('api/collection/upload', {file})
    // sessionStorage.setItem('tokenUser', data.token)
    // sessionStorage.setItem('userId', data.user.id)
    try {
        const  response  = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
        console.log('response.data.url=',response.data.url);
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
    return data
}