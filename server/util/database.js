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
                    db.run(insert, ["Welcome","https://yeyelife.com/wp-content/uploads/2020/09/welcome.jpg","<center>Welcome to the application! Here you can find relevant news catered just for you!</center>"])
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
                    db.run(insert, [1, "Important"])
                    db.run(insert, [1, "Public"])
                    }
                });
    }
});

module.exports = db