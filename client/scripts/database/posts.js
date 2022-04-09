import doFetch from '../utils/fetch'
import AsyncStorage from '@react-native-async-storage/async-storage';

/* const url = convertIp(baseUrl) + 'api/posts'
const usePosts = () => {
    const upload = async (fd, userToken) => {
        const options = {
            method: 'POST',
            headers: { 'x-access-token': userToken },
            data: fd,
        };
        try {
        } catch (error) {
            throw new Error(error.message)
        }
    }
    return { upload }
} */

export const uploadPost = async (title, image, html, onDone = () => {} ) => {
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

export default { uploadPost }