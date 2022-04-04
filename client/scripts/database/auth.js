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
    const json = await response.json();

    if (json.error) {
        console.log(response.status)

        // if API response contains error message (use Postman to get further details)
        throw new Error(json.message + ': ' + json.error);

    } else if (!response.ok) {
        // if API response does not contain error message, but there is some other error
        throw new Error(`doFetch failed with status ${response.statusText}`);
    } else {
        // if all goes well
        if (json.message != undefined && json.message == "success") {
            await AsyncStorage.setItem("userToken", json.data.token);
            await AsyncStorage.setItem("username", username)
            await AsyncStorage.setItem("password", password)
            onDone(json.data.token)
            return json.data.token
        } else {
            onDone(undefined)
            return undefined
        }
    }
}

/* const logout = () => {
    token = ""
    lastUsername = undefined
    lastPassword = undefined
} */

//const loggedIn = () => token.length > 0 && lastUsername != undefined && lastPassword != undefined



export default { login }