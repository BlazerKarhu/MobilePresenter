var secureRandom = require('secure-random');

/**
 * Administrative username for uploading.
*/
const username = "admin"

/**
 * Administrative password for uploading.
*/
const password = "pass"

/**
 * Secret salt for authentication purposes.
 * Can be left as is, but a custom salt such as "mysalt" can also be used.
*/
const salt = secureRandom(256, {type: 'Buffer'}).toString('base64');

/**
 * Port for the server to use.
*/
const port = 3000



module.exports = {username, password, salt, port}