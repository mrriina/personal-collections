import axios from 'axios';
import {$host} from './index';


// export async function createCollection(title, description, theme, image_url, owner, customFields) {
//     try {
//         const {data} = await $host.post('api/collection/create', {title, description, theme, image_url, owner, customFields})
//         return data
//     } catch (e) {
//         console.log(`Server error: ${e.message}`);
//     }
// }


export async function getItems(collectionId) {
    try {
        const {data} = await $host.post('api/item/getItems', {collectionId})
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}