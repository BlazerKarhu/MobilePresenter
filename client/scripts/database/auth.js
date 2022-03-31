import { baseUrl } from '../../app.config'
import doFetch from '../utils/fetch'

export var token = ""

/**
 * Logs the the user in with the specified credentials. 
 * Will call function onDone(bool) once done
 * 
 * Example:
 * import auth from '../database/auth';
 * auth.login("admin","pass", (successLogin) => {console.log(successLogin)});
 */
const login = async (username, password, onDone = () => {}) => {
    const result = await doFetch(baseUrl + '/' + 'api/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ 'username': username, 'password': password })
        });

    console.log(result)

    if (result.message != undefined && result.message == "success") {
        token = result.data.token
        onDone(!!token.length)
    } else {
        onDone(false)
    }
}



export default {token, login}