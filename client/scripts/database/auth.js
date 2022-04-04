import { baseUrl } from '../../client.config'
import doFetch from '../utils/fetch'
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
    const result = await doFetch(baseUrl + 'api/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ 'username': username, 'password': password }),
        });

    console.log(result)
    console.log("result data token", result.data.token)

    if (result.message != undefined && result.message == "success") {
        await AsyncStorage.setItem("userToken", result.data.token);
        await AsyncStorage.setItem("username", username)
        await AsyncStorage.setItem("password", password)
        onDone(result.data.token)
        return result.data.token
    } else {
        onDone(undefined)
        return undefined
    }
}

/* const logout = () => {
    token = ""
    lastUsername = undefined
    lastPassword = undefined
} */

//const loggedIn = () => token.length > 0 && lastUsername != undefined && lastPassword != undefined



export default { login }