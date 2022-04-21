import { baseUrl } from '../../client.config'
import { convertIp } from '../utils/debug'
import AsyncStorage from '@react-native-async-storage/async-storage';

/* export var token = ""
export var lastUsername = undefined
export var lastPassword = undefined
 */

/**
 * Logs the the user in with the specified credentials. 
 * Will call function onDone(bool) once done
 * 
 * Example:
 * import auth from '../database/auth';
 * auth.login("admin","pass", (successLogin) => {console.log(successLogin)});
 */
const login = async (username, password, onDone = () => { }) => {
    const url = convertIp(baseUrl) + 'api/login'
    const options =
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 'username': username, 'password': password }),
    };

    const response = await fetch(url, options);
    const json = await tryParseResponseJson(response)

    if (!response.ok) // Status not between 200-299
    {
        console.log(json)
        onDone(json)
        return json;
    }
    else {
        if (json.error == undefined) {
            await AsyncStorage.setItem("userToken", json.data.token);
            await AsyncStorage.setItem("username", username)
            await AsyncStorage.setItem("password", password)
            onDone(json.data.token)
            return json.data.token
        } else {
            onDone(json)
            return json
        }
    }
}

const tryParseResponseJson = async (response) => {
    try {
        const json = await response.json();

        if (json == undefined) return { error: response.statusText != undefined ? response.statusText : `Undefined error with status ${response.status}`, ok: response.ok, status: response.status }
        else if (json.error != undefined) return { error: json.error, ok: response.ok, status: response.status }
        else return json

    } catch (err) {
        return { error: response.statusText != undefined ? (response.statusText != "" ? response.statusText : "Network error with status " + response.status) : err.toString(), ok: response.ok, status: response.status }
    }
}

export default { login }