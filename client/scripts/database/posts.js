import doFetch from '../utils/fetch'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadPost = async (title, image, html, onDone = () => { }) => {
    const userToken = await AsyncStorage.getItem("userToken")

    const result = await doFetch('api/posts',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': userToken },
            body: JSON.stringify({ 'title': title, 'image': image, 'html': html, })
        });
    if (result.message != undefined && result.message == "success") {
        onDone(result)
        return result
    }

    onDone(result)
    return result
}
const getPosts = async (tags=[], onDone=()=>{} ) => {
    console.log('tags array',tags)
    if (tags.length>0) {
        const result = await doFetch('api/posts?' + new URLSearchParams({
            tags: tags,
        }),
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            });
        if (result.message != undefined && result.message == "success") {
            onDone(result)
            return result
        } else {
            onDone(undefined)
            return undefined
        }
    } else {
        const result = await doFetch('api/posts',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            });

        if (result.message != undefined && result.message == "success") {
            onDone(result)
            return result
        } else {
            onDone(undefined)
            return undefined
        }
    }

}

export default { uploadPost, getPosts }