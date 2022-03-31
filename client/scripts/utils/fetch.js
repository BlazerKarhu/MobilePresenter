const doFetch = async (url, options = {}) => {
    const response = await fetch(url, options);
    const json = await response.json();
    if (json.error) {
      // if API response contains error message (use Postman to get further details)
      throw new Error(json.message + ': ' + json.error);
    } else if (!response.ok) {
      // if API response does not contain error message, but there is some other error
      throw new Error(`doFetch failed with status ${response.statusText}`);
    } else {
      // if all goes well
      return json;
    }
  }; 

  export default doFetch
