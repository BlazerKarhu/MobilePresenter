const express = require('express')
const app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/', async (req, res) => {
  res.send('hello world!')
})

app.listen(3000, () => {
    console.log(`Server listening on localhost:3000`)
  })

  //GET users

  app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

    //GET posts

    app.get("/api/posts", (req, res, next) => {
        var sql = "select * from posts"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
          });
    });

    //GET tags

    app.get("/api/tags", (req, res, next) => {
        var sql = "select * from tags"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.status(400).json({"error":err.message});
              return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
          });
    });

//POST an user

app.post("/api/users/", (req, res, next) => {
  var errors=[]
  if (!req.body.password){
      errors.push("No password specified");
  }
  if (!req.body.email){
      errors.push("No email specified");
  }
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  var data = {
      name: req.body.name,
      email: req.body.email,
      password : md5(req.body.password)
  }
  var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
  var params =[data.name, data.email, data.password]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "message": "success",
          "data": data,
          "id" : this.lastID
      })
  });
})

//POST a posts

app.post("/api/posts/", (req, res, next) => {
    var errors=[]
    if (!req.body.Title){
        errors.push("No Title specified");
    }
    if (!req.body.image){
        errors.push("No image specified");
    }
    if (!req.body.Html){
        errors.push("No Html specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Title: req.body.Title,
        image: req.body.image,
        Html: req.body.Html,
    }
    var sql ='INSERT INTO posts (Title, image, Html) VALUES (?,?,?)'
    var params =[data.Title, data.image, data.Html]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
  })
  
//POST a tag

app.post("/api/tags/", (req, res, next) => {
    var errors=[]
    if (!req.body.tag){
        errors.push("No tag specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        postId: req.body.postId,
        tag: req.body.tag,
    }
    var sql ='INSERT INTO tags (postId, tag) VALUES (?,?)'
    var params =[data.postId, data.tag]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
  })

//UPDATE an user

app.patch("/api/users/:id", (req, res, next) => {
  var data = {
      name: req.body.name,
      email: req.body.email,
      password : req.body.password ? md5(req.body.password) : null
  }
  db.run(
      `UPDATE user set 
         name = COALESCE(?,name), 
         email = COALESCE(?,email), 
         password = COALESCE(?,password) 
         WHERE id = ?`,
      [data.name, data.email, data.password, req.params.id],
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({
              message: "success",
              data: data,
              changes: this.changes
          })
  });
})

//DELETE an user

app.delete("/api/users/:id", (req, res, next) => {
  db.run(
      'DELETE FROM user WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.json({"message":"deleted", changes: this.changes})
  });
})