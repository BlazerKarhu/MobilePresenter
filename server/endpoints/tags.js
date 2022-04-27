const express = require('express')
var db = require("../util/database")
const router = express.Router()

// Get tags
router.get("/", (req, res, next) => {
    const tag = req.query.tag
    console.log("Tag:" + tag)
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
    console.log('req.body for get tag',req.body)
    if (!req.body.tag) {
        errors.push("No tag specified");
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        tag: req.body.tag.toLowerCase(),
    }
    console.log('data.tag:', data.tag)
    var sql = ` SELECT tags.tagsId FROM tags WHERE tags.tag = '${data.tag}' LIMIT 1`
    var params = []
    db.all(sql, params, (err, rows) => {
        console.log('First rows on line 46 of postTag:', rows)
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        if (rows.length == 0) {
            var sql = `INSERT INTO tags (tag) VALUES (?)`
            var params = [data.tag]
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
        } else {
            console.log('Rows of postTag:', rows)
            res.json({
                "message": "success",
                "data": data,
                "id": rows[0].tagsId
            })
        }
    });



})

module.exports = router