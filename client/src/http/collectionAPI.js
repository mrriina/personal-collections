import axios from 'axios';
import {$host} from './index';


export async function uploadCollectionFile(data, cloudName) {
    try {
        const  response  = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data);
        return response.data.url;
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export async function createCollection(title, description, theme, image_url, owner, customFields) {
    try {
        const {data} = await $host.post('api/collection/create', {title, description, theme, image_url, owner, customFields})
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export async function getCollectionById(id) {
    try {
        const data = await $host.get(`api/collection/getCollectionById/${id}`)
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export async function getCollectionsByProfileId(profileId) {
    try {
        const {data} = await $host.post('api/collection/getCollectionsByProfileId', {profileId: profileId})
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export async function deleteCollection(id) {
    try {
        const response = await $host.delete(`api/collection/deleteCollection/${id}`)
        return response.message
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}