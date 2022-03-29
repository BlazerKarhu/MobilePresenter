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
            Title text, 
            image blob, 
            Html text
            )`,
            (err) => {
                if (err) {
                    // Table already created
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
                });
    }
});

module.exports = db