import axios from 'axios';
import {$host} from './index';


export async function createItem(title, tags, customFieldsValues, collectionId) {
    try {
        const {data} = await $host.post('api/item/create', {title, tags, customFields: customFieldsValues, collectionId})
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export async function getItems(collectionId) {
    try {
        const {data} = await $host.post('api/item/getItems', {collectionId})
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export async function deleteItem(id) {
    try {
        const response = await $host.delete(`api/item/deleteItem/${id}`)
        return response
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}

export async function deleteItemsByCollectionId(collectionId) {
    try {
        const response = await $host.delete(`api/item/deleteItemsByCollectionId`, {collectionId: collectionId})
        return response
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export async function updateItemById(id, title, tags, customFieldsValues){
    try {
        const response = await $host.put(`api/item/updateItem/${id}`, {title, tags, customFields: customFieldsValues})
        return response
    } catch (e) {
        console.log('Error: ', e);
    }
}