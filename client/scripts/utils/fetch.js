import auth from '../database/auth'
import { baseUrl } from '../../client.config'
import { convertIp } from '../utils/debug'
import AsyncStorage from '@react-native-async-storage/async-storage';

const doFetch = async (url, options = {}) => {

  const response = await fetch(convertIp(baseUrl) + url, options);

  if (!response.ok) // Status not between 200-299
  {
    if (response.status == 401) // Attempt to re-authenticate
    {
      return await fetchReAuthenticate(url, options, response)
    }
  }

  return tryParseResponseJson(response)
};

const fetchReAuthenticate = async (url, options, response) => {
  const username = await AsyncStorage.getItem("username");
  const password = await AsyncStorage.getItem("password");

  if (username != undefined && password != undefined && await auth.login(username, password)) {
    const userToken = await AsyncStorage.getItem("userToken")

    // Unauthorized, most likely due to token expiration, try again after logging in again
    options.headers = { ...options.headers, 'Authorization': userToken }
    return await doFetch(url, options)

  } else {
    return await tryParseResponseJson(response);
  }
}

const tryParseResponseJson = async (response) => {
  try {
    const json = await response.json();

    if (json == undefined) return { error: response.statusText != undefined ? response.statusText : `Undefined error with status ${response.status}`, ok: response.ok, status: response.status }
    else if (json.error != undefined) return { error: json.error, ok: response.ok, status: response.status }
    else return json

  } catch (err) {
    return { error: response.statusText != undefined ? (response.statusText != "" ? response.statusText : "Network error with status "+response.status) : err.toString(), ok: response.ok, status: response.status }
  }
}


export default doFetch
