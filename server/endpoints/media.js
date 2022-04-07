const express = require('express')

const auth = require('../util/auth')
const fs = require('fs');

const router = express.Router()

/**
 * Automatic system for accepting new file types. 
 * Base64 data types accepted based on which folder names are in ./public
 * Will place the given data types in their respective folders.
 * Example "data:image/jpeg;base64,..." => ./public/image
*/

// Get media
router.use("/", express.static('public'))

router.use(auth)

// Add media
router.post("/", (req, res, next) => {
    var errors = []
    if (!req.body.media) {
        errors.push("No media specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {}

    try {
        const split = req.body.media.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/, 3)
        const folder = split[1]

        if (req.body.media.slice(0, "data:".length) != "data:" || !folder.length || !fs.existsSync('./public/' + folder)) {
            throw "Invalid formatting in media or media type was not accepted";
        }

        const filetype = split[2]

        data.path = '/' + folder + '/' + Date.now() + '.' + filetype

        const base64Data = req.body.media.replace(/^data:(.*?);base64,/, '').replace(/ /g, '+');

        fs.writeFileSync('./public' + data.path, base64Data, { encoding: 'base64' });

        data.path = req.baseUrl + data.path
    } catch (err) {
        res.status(400).json({ "error": err })
        return;
    }

    res.json({
        "message": "success",
        "data": data,
        "id": this.lastID
    })
})

module.exports = router