import doFetch from '../utils/fetch'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadTags = async (postId, tag, onDone = () => { }) => {
    const userToken = await AsyncStorage.getItem("userToken")

    const result = await doFetch('api/tags',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': userToken },
            body: JSON.stringify({ 'postId': postId, 'tag': tag })
        });
    if (result.message != undefined && result.message == "success") {
        onDone(result)
        return result
    }

    onDone(result)
    return result
}



export default { uploadTags }