
const express = require('express')
var db = require("../util/database")
const router = express.Router()

// Get posts
router.get("/", (req, res, next) => {
    var errors = []
    if (!req.query.tags) {
        errors.push("No Tags specified");
    }
    if (!req.query.include) {
        errors.push("Inclusion or exclusion not specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    const include = req.query.include.toLowerCase() == 'true'

    var tags = req.query.tags.split(',').map(e => ` tags ${!include ? "NOT" : ""} LIKE '%${e}%' AND`).join("");
    tags = tags.slice(0,tags.length - "AND".length)

    console.log("Tags:" + req.query.tags)
    console.log(tags)

    const limit = Number.isInteger(parseInt(req.query.limit)) && parseInt(req.query.limit) >= 0 ? parseInt(req.query.limit) : undefined;
    // REMEMBER: All api inputs must be vetted. 

    var sql = `
    SELECT * FROM
        (SELECT * FROM
            (SELECT postId, GROUP_CONCAT(tag) AS tags FROM postsTags INNER JOIN tags ON postsTags.tagsid = tags.tagsid GROUP BY postid)
        WHERE ${tags})
    as groupedtags INNER JOIN posts ON posts.postId = groupedtags.postId ORDER BY posts.date ${limit != undefined ? "LIMIT " + limit : ""}`

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

// Add post
router.post("/", (req, res, next) => {
    var errors = []
    if (!req.body.title) {
        errors.push("No Title specified");
    }
    if (!req.body.image) {
        errors.push("No image specified");
    }
    if (!req.body.html) {
        errors.push("No Html specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        title: req.body.title,
        image: req.body.image,
        html: req.body.html,
    }
    var sql = 'INSERT INTO posts (title, image, html) VALUES (?,?,?)'
    var params = [data.title, data.image, data.html]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})


// Delete post

router.delete("/", (req, res, next) => {
    db.run(
        'DELETE FROM posts WHERE postId = ?',
        req.body.postId,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }

            res.json({
                "message": "success",
                "data": {},
                "changes": this.changes
            })
        });
})

module.exports = router