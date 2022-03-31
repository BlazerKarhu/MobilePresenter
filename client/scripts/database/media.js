import { baseUrl } from '../../app.config'
import doFetch from '../utils/fetch'
import { token } from './auth'

/**
 * Uploads the given base64 media (image/video/...?)
 * Will call function result(imageUrl) once done. Undefined if error.
 * 
 * Example:
 * import media from '../database/media';
 * media.uploadMedia(`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII`,(path) => 
 * {
 *  console.log(path)
 * })
 */
const uploadMedia = async (base64, onDone) => {
    const result = await doFetch(baseUrl + '/' + 'api/media',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': token },
            body: JSON.stringify({ 'media': base64 })
        });

    console.log(result)

    if (result.message != undefined && result.message == "success") {
        const path = result.data.path
        const ret = path.slice(0, "http".length) == "http" ? path : baseUrl + path
        onDone(ret)
        return ret
    } else {
        onDone(undefined)
        return undefined
    }
}



export default { uploadMedia }