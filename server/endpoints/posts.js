
const express = require('express')
var db = require("../util/database")
const router = express.Router()

// Get posts
router.get("/", (req, res, next) => {
    var errors = []
    if (req.query.include == undefined ) {
        errors.push("Includes not defined");
    }
    else if (req.query.tags == undefined ) {
        errors.push("Tags not defined");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    const includes = req.query.include?.toLowerCase().split(',').map((inc) => inc == 'true');
    const tags = req.query.tags?.split(',');

    if(includes.length != tags.length)
    {
        errors.push("Insufficient includes for tags given");
        res.status(400).json({ "error": errors.join(",") });
        return;
    }

    

    var tagsSql = tags.map((e,i) => ` tags ${!includes[i] ? "NOT" : ""} LIKE '%${e}%' AND`).join("");
    tagsSql = tagsSql?.slice(0,tagsSql.length - "AND".length)

    console.log(` tags${!includes[1] ? " NOT" : ""} LIKE '%${tags[1]}%' AND`)

    const limit = Number.isInteger(parseInt(req.query.limit)) && parseInt(req.query.limit) >= 0 ? parseInt(req.query.limit) : undefined;
    // REMEMBER: All api inputs must be vetted. 

    var sql = `
    SELECT * FROM
        (SELECT * FROM
            (SELECT postId, GROUP_CONCAT(tag) AS tags FROM postsTags INNER JOIN tags ON postsTags.tagsid = tags.tagsid GROUP BY postid)
         ${tags != undefined ? "WHERE " + tagsSql : "" })
    as groupedtags INNER JOIN posts ON posts.postId = groupedtags.postId ORDER BY posts.date DESC ${limit != undefined ? "LIMIT " + limit : ""}`

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