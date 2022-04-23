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
const getPosts = async (tags=[], include = true, limit = undefined, onDone=()=>{} ) => {
    console.log('tags array',tags)
    if (tags.length>0) {

        var params = new URLSearchParams({
            tags: tags,
            include: include
        })

        if(limit != undefined) params.append("limit",limit)

        console.log(params.toString())

        const result = await doFetch('api/posts?' + params.toString(),
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

export const deletePost = async (postId, onDone = () => {} ) => {


    const result = await doFetch('api/posts',
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({'postId': postId})
        });
    if (result.message != undefined && result.message == "success") {
        onDone(result)
        return result
    }

    onDone(result)
    return result
}

export default { uploadPost, getPosts, deletePost }