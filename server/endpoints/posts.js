
const express = require('express')
var db = require("../util/database")
const router = express.Router()

// Get posts
router.get("/", (req, res, next) => {
    console.log("Tags:" + req.query.tags)
    const limit = Number.isInteger(parseInt(req.query.limit)) && parseInt(req.query.limit) >= 0 ? parseInt(req.query.limit) : undefined;
    // REMEMBER: All api inputs must be vetted. 

    if (req.query.tags == "important") {
        var sql = `select * from posts LEFT JOIN tags ON posts.postId = tags.postId WHERE tags.tag IN ('important') order by posts.date desc ${limit ? `limit ${limit}` : ""}`
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
    } else {
        //"select * from posts LEFT JOIN tags ON posts.postId = tags.postId WHERE tags.tag NOT IN () GROUP BY posts.postId" + req.query.limit != null ? " limit " + req.query.limit : ""
        var sql = (`select * from posts order by posts.date desc ${limit ? `limit ${limit}` : ""}`)
        console.log(sql);
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
    }
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
            if (err){
                res.status(400).json({"error": res.message})
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