import auth, { lastPassword } from '../database/auth'

const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    if (response.status == 401 && auth.lastUsername != undefined && auth.lastPassword != undefined) {
      
      // Unauthorized, most likely due to token expiration, try again after logging in again
      if (await auth.login(auth.lastUsername, auth.lastPassword))
        return await doFetch(url, { ...options, 'Authorization': auth.token })
    }
    else {
      console.log(response.status)

      // if API response contains error message (use Postman to get further details)
      throw new Error(json.message + ': ' + json.error);
    }
  } else if (!response.ok) {
    console.log("AuthRetry2")
    // if API response does not contain error message, but there is some other error
    throw new Error(`doFetch failed with status ${response.statusText}`);
  } else {
    // if all goes well
    return json;
  }

};

export default doFetch
