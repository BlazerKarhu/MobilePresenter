import doFetch from '../utils/fetch'
import { convertIp } from '../utils/debug'
import { baseUrl } from '../../client.config'

import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Uploads the given base64 media (image/video/...?)
 * Will call function onDone(mediaPath) once done. MediaPath.error is not undefined if error.
 * 
 * Example:
 * import media from '../database/media';
 * media.uploadMedia(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII`,(path) => 
 * {
 *  console.log(path)
 * })
 */
export const uploadMedia = async (base64, onDone = () => { }) => {
    const userToken = await AsyncStorage.getItem("userToken")

    const result = await doFetch('api/media',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': userToken },
            body: JSON.stringify({ 'media': base64 })
        });

    if (result.message != undefined && result.message == "success") {
        const path = result.data.path
        const ret = path.slice(0, "http".length) == "http" ? path : convertIp(baseUrl).slice(0, convertIp(baseUrl).length - 1) + path
        onDone(ret)
        return ret
    }

    onDone(result)
    return result
}



export default { uploadMedia }