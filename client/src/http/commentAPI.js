import axios from 'axios';
import {$host} from './index';


export async function createComment(content, collectionItemId, profileId) {
    try {
        const {data} = await $host.post('api/comment/create', {content, collectionItemId, profileId})
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}


export async function getCommentsByItemId(itemId) {
    try {
        const data = await $host.get(`api/comment/getCommentsByItemId/${itemId}`)
        return data
    } catch (e) {
        console.log(`Server error: ${e.message}`);
    }
}