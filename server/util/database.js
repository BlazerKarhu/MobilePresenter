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
            html text,
            date datetime DEFAULT(DateTime())
            )`,
            (err) => {
                if (err) {
                    // Table already created
                }else{
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO posts (title, image, html) VALUES (?,?,?)'
                    db.run(insert, ["Welcome","https://github.com/Cyroxin/MobilePresenter/raw/main/client/assets/welcome.jpg","<center>Welcome to the application! Here you can find relevant news catered just for you!</center>"])
                }
            });

            db.run(`CREATE TABLE tags (
                tagsId INTEGER PRIMARY KEY AUTOINCREMENT,
                tag text
                )`,
                (err) => {
                    if (err) {
                        // Table already created
                    }else{
                        // Table just created, creating some rows
                        var insert = 'INSERT INTO tags (tag) VALUES (?)'
                        db.run(insert, ["important"])
                        db.run(insert, ["news"])
                        db.run(insert, ["announcement"])
                    }
                }
                );

            db.run(`CREATE TABLE postsTags (
                postId INTEGER,
                tagsId INTEGER,
                PRIMARY KEY(postId, tagsId)
                )`,
                (err) => {
                    if (err) {
                        // Table already created
                    }else{
                        // Table just created, creating some rows
                        var insert = 'INSERT INTO postsTags (postId, tagsId)) VALUES (?,?)'
                        db.run(insert, [1,1])
                        db.run(insert, [1,2])
                        db.run(insert, [1,2])
                    }
                }
                );
    }
});

module.exports = db