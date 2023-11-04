import axios from 'axios';
import {$host} from './index';


export const uploadCollectionFile = async (data, cloudName) => {
    try {
        const  response  = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
        return response.data.url;
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export const createCollection = async (title, description, theme, image_url, owner, customFields) => {
    try {
        console.log('client owner ==', owner);
        const {data} = await $host.post('api/collection/create', {title, description, theme, image_url, owner, customFields})
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}