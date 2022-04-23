const express = require('express')
var db = require("../util/database")
const router = express.Router()

// Get postsTags
router.get("/", (req, res, next) => {
    var sql = "select * from postsTags"
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

// Add postsTags
router.post("/", (req, res, next) => {
    var errors = []
    if (!req.body.tagId) {
        errors.push("No tagId specified");
    }
    if (!req.body.postId){
        errors.push("No postId specified")
    }
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        postId: req.body.postId,
        tagId: req.body.tagId,
    }
    var sql = 'INSERT INTO postsTags (postId, tagsId) VALUES (?,?)'
    var params = [data.postId, data.tagId]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
        })
    });
})

module.exports = router