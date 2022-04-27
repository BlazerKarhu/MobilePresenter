import doFetch from '../utils/fetch'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const uploadTags = async (post, tag, onDone = () => { }) => {
    const userToken = await AsyncStorage.getItem("userToken")

    const result = await doFetch('api/tags',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': userToken },
            body: JSON.stringify({ 'post': post, 'tag': tag })
        });

        console.log(result)

    onDone(result)
    return result
}

export const getTags = async (tag = undefined, onDone = () => { }) => {
    if (tag != undefined) {

        var params = new URLSearchParams({
            tag: tag,
        })
        const result = await doFetch('api/tags', + params.toString(),
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
        const result = await doFetch('api/tags',
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




export default { uploadTags, getTags }