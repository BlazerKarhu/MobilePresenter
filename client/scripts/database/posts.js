import doFetch from '../utils/fetch'


const getPosts = async (onDone) => {
    const result = await doFetch('api/posts',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        });

    console.log(result)

    if (result.message != undefined && result.message == "success") {
        onDone(result)
        return result
    } else {
        onDone(undefined)
        return undefined
    }
}
export default { getPosts }