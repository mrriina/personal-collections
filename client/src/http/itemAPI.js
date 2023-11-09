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