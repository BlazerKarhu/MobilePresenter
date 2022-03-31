const express = require('express')
var nJwt = require('njwt');
const { salt } = require('../app.config');

const auth = async (req, res, next) => {
    const token = (req.headers.authorization != undefined && req.headers.authorization.split(' ')[0] === 'Bearer') ?
        req.headers.authorization.split(' ')[1] : req.headers["authorization"]

    if (token != undefined && token.length) {
        nJwt.verify(token, salt, (err, verifiedJwt) => {
            if (err) {
                res.status(401).json({ "error": err != undefined ? err.userMessage : "Unauthorized, bad bearer token" }) // Unauthorized, tampering or expired
                console.log(err)
                return;
            } else {
                req.token = verifiedJwt
                //console.log(verifiedJwt); // Will contain the header and body
                next()
            }
        });
    }
    else {
        res.status(401).json({ "error": "Unauthorized, missing bearer token" }) // Token missing
    }
}

module.exports = auth