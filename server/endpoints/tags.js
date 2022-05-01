const express = require('express')
var db = require("../util/database")
const router = express.Router()

// Get tags
router.get("/", (req, res, next) => {
    var sql = ` SELECT * FROM tags`
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

// Add tag
router.post("/", (req, res, next) => {
    var errors = []
    console.log('req.body for get tag', req.body)
    if (!req.body.post) {
        errors.push("No post specified");
    }
    if (!req.body.tag) {
        errors.push("No tag specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    var data = {
        post: req.body.post,
        tag: req.body.tag.toLowerCase(),
    }

    findTag(data.tag, (err, tag) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }


        if (tag != undefined) {
            // Tag was found, so connect the tag with the given post
            connectTag(data.post, tag.tagsId, (err, _) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }

                res.json({
                    "message": "success",
                    "data": data,
                })
            })
        } else {
            // Tag was not found, so create a new one
            addTag(data.tag, (err, tagId) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }


                // Connect the tag with the given post

                connectTag(data.post, tagId, (err, _) => {
                    if (err) {
                        res.status(400).json({ "error": err.message });
                        return;
                    }

                    res.json({
                        "message": "success",
                        "data": data,
                    })
                })
            })

        }
    })
})

const findTag = (tag, result = (err, result) => { }) => {
    var sql = `SELECT tags.tagsId FROM tags WHERE tags.tag = '${tag}' LIMIT 1`
    db.all(sql, [], (err, resp) => {
        if (resp == undefined || resp.length == 0) {
            result(err, undefined)
        } else result(err, resp[0]);
    });
}

const addTag = (tag, result = (err, result) => { }) => {
    var sql = `INSERT INTO tags (tag) VALUES (?)`
    var params = [tag]
    db.run(sql, params, function (err, _) {
        result(err, this.lastID);
    });
}

const connectTag = (postId, tagId, result = (err, result) => { }) => {
    var sql = 'INSERT INTO postsTags (postId, tagsId) VALUES (?,?)'
    var params = [postId, tagId]
    db.run(sql, params, function (err, resp) {
        result(err, resp);
    });
}

module.exports = router