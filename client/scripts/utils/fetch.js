import auth from '../database/auth'
import { baseUrl } from '../../client.config'
import { convertIp } from '../utils/debug'
import AsyncStorage from '@react-native-async-storage/async-storage';

const doFetch = async (url, options = {}) => {
  const response = await fetch(convertIp(baseUrl) + url, options);
  const json = await response.json();

  if (json.error) {
    if (response.status == 401) {

      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");

      if (username != undefined && password != undefined && await auth.login(username, password)) {
        const userToken = await AsyncStorage.getItem("userToken")

        // Unauthorized, most likely due to token expiration, try again after logging in again
        options.headers = { ...options.headers, 'Authorization': userToken }
        return await doFetch(url, options)

      } else {
        console.log(response.status)
        throw new Error(json.message + ': ' + json.error);
      }
    }
    else {
      console.log(response.status)

      // if API response contains error message (use Postman to get further details)
      throw new Error(json.message + ': ' + json.error);
    }
  } else if (!response.ok) {
    // if API response does not contain error message, but there is some other error
    throw new Error(`doFetch failed with status ${response.statusText}`);
  } else {
    // if all goes well
    return json;
  }

};


export default doFetch
