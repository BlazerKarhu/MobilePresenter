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
    var data = {
        media: req.body.media,
    }

    try {
        const folder = data.media.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/,2)[1]

        console.log(folder)

        if (data.media.slice(0, "data:".length) != "data:" || !folder.length || !fs.existsSync('./public/' + folder)) {
            throw "Invalid formatting in media or media type was not accepted";
        }

        data.path = '/'+folder + '/' + Date.now() + '.png'

        const base64Data = data.media.replace(/^data:([A-Za-z-+/]+);base64,/, '');

        fs.writeFileSync('./public' + data.path, base64Data, { encoding: 'base64' });

        data.path = req.baseUrl + data.path
    } catch(err)
    {
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