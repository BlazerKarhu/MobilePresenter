var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`, 
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                db.run(insert, ["user","user@example.com",md5("user123456")])
            }
        });  

        db.run(`CREATE TABLE posts (
            postId INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            image text,
            html text
            )`,
            (err) => {
                if (err) {
                    // Table already created
                }else{
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO posts (title, image, html) VALUES (?,?,?)'
                    db.run(insert, ["kitten 1","https://placekitten.com/489/163","<center>kitten 1</center>"])
                    db.run(insert, ["kitten 2","https://placekitten.com/490/164","<center>kitten 2</center>"])
                    db.run(insert, ["kitten 3","https://placekitten.com/491/163","<center>kitten 3</center>"])
                }
            });

            db.run(`CREATE TABLE tags (
                tagsId INTEGER PRIMARY KEY AUTOINCREMENT,
                postId int, 
                tag text, 
                FOREIGN KEY(postId) REFERENCES posts(postId)
                )`,
                (err) => {
                    if (err) {
                        // Table already created
                    }
                    else{
                        // Table just created, creating some rows
                    var insert = 'INSERT INTO tags (postId, tag) VALUES (?,?)'
                    db.run(insert, [1, "Kitten"])
                    db.run(insert, [1, "Yarn"])
                    db.run(insert, [2, "Kitten"])
                    db.run(insert, [2, "Stare"])
                    db.run(insert, [3, "Kitten"])
                    }
                });
    }
});

module.exports = db