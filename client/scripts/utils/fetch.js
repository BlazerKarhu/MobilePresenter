import auth from '../database/auth'

const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    if (response.status == 401 && auth.lastUsername != undefined && auth.lastPassword != undefined &&
      await auth.login(auth.lastUsername, auth.lastPassword)) {

      // Unauthorized, most likely due to token expiration, try again after logging in again
      options.headers = { ...options.headers, 'Authorization': auth.token }
      return await doFetch(url, options)
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
